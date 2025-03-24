import { NextResponse } from "next/server";
import { db } from "@/lib/firebase/firebase";
import { verifyToken } from "@/lib/firebase/admin";
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  limit,
  startAfter,
  where,
  getDoc
} from "firebase/firestore";

// Helper function to verify the token from request
async function verifyAuthToken(request: Request) {
  const authHeader = request.headers.get('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split('Bearer ')[1];
  return await verifyToken(token);
}

// GET /api/posts - Get all posts with pagination
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lastId = searchParams.get("lastId");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");

    // Authentication is required but we don't check ownership for read operations
    const decodedToken = await verifyAuthToken(request);
    if (!decodedToken) {
      return NextResponse.json(
        { error: "Unauthorized - Invalid token" },
        { status: 401 }
      );
    }

    let postsQuery = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
      limit(pageSize)
    );

    if (lastId) {
      const lastDoc = await getDocs(query(collection(db, "posts"), where("id", "==", lastId)));
      if (!lastDoc.empty) {
        postsQuery = query(
          collection(db, "posts"),
          orderBy("createdAt", "desc"),
          startAfter(lastDoc.docs[0]),
          limit(pageSize)
        );
      }
    }

    const snapshot = await getDocs(postsQuery);
    const posts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

// POST /api/posts - Create a new post
export async function POST(request: Request) {
  try {
    // Verify the token first
    const decodedToken = await verifyAuthToken(request);
    if (!decodedToken) {
      return NextResponse.json(
        { error: "Unauthorized - Invalid token" },
        { status: 401 }
      );
    }

    const userId = decodedToken.uid;
    const body = await request.json();
    const { content, imageUrl } = body;

    if (!content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const postData = {
      content,
      userId,
      imageUrl,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0
    };

    const docRef = await addDoc(collection(db, "posts"), postData);
    
    return NextResponse.json({
      id: docRef.id,
      ...postData
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}

// PUT /api/posts - Update a post
export async function PUT(request: Request) {
  try {
    // Verify the token first
    const decodedToken = await verifyAuthToken(request);
    if (!decodedToken) {
      return NextResponse.json(
        { error: "Unauthorized - Invalid token" },
        { status: 401 }
      );
    }

    const userId = decodedToken.uid;
    const body = await request.json();
    const { postId, content, imageUrl } = body;

    if (!postId || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user owns the post
    const postRef = doc(db, "posts", postId);
    const postDoc = await getDoc(postRef);
    
    if (!postDoc.exists()) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    if (postDoc.data().userId !== userId) {
      return NextResponse.json(
        { error: "Unauthorized - You can only update your own posts" },
        { status: 403 }
      );
    }

    await updateDoc(postRef, {
      content,
      imageUrl,
      updatedAt: new Date().toISOString()
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

// DELETE /api/posts - Delete a post
export async function DELETE(request: Request) {
  try {
    // Verify the token first
    const decodedToken = await verifyAuthToken(request);
    if (!decodedToken) {
      return NextResponse.json(
        { error: "Unauthorized - Invalid token" },
        { status: 401 }
      );
    }

    const userId = decodedToken.uid;
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    // Check if user owns the post
    const postRef = doc(db, "posts", postId);
    const postDoc = await getDoc(postRef);
    
    if (!postDoc.exists()) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    if (postDoc.data().userId !== userId) {
      return NextResponse.json(
        { error: "Unauthorized - You can only delete your own posts" },
        { status: 403 }
      );
    }

    await deleteDoc(postRef);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
} 
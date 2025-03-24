import { NextResponse } from "next/server";
import { db } from "@/lib/firebase/firebase";
import { verifyToken } from "@/lib/firebase/admin";
import { 
  collection, 
  addDoc, 
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
  increment,
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

// GET /api/comments - Get comments for a post
export async function GET(request: Request) {
  try {
    // Verify the token first
    const decodedToken = await verifyAuthToken(request);
    if (!decodedToken) {
      return NextResponse.json(
        { error: "Unauthorized - Invalid token" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    const commentsQuery = query(
      collection(db, "comments"),
      where("postId", "==", postId),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(commentsQuery);
    const comments = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

// POST /api/comments - Add a comment to a post
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
    const { postId, content } = body;

    if (!postId || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const commentData = {
      postId,
      userId,
      content,
      createdAt: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, "comments"), commentData);

    // Update post comments count
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      comments: increment(1)
    });

    return NextResponse.json({
      id: docRef.id,
      ...commentData
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      { error: "Failed to add comment" },
      { status: 500 }
    );
  }
}

// DELETE /api/comments - Delete a comment
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
    const commentId = searchParams.get("commentId");
    const postId = searchParams.get("postId");

    if (!commentId || !postId) {
      return NextResponse.json(
        { error: "Comment ID and Post ID are required" },
        { status: 400 }
      );
    }

    // Check if user owns the comment
    const commentRef = doc(db, "comments", commentId);
    const commentDoc = await getDoc(commentRef);
    
    if (!commentDoc.exists()) {
      return NextResponse.json(
        { error: "Comment not found" },
        { status: 404 }
      );
    }

    if (commentDoc.data().userId !== userId) {
      return NextResponse.json(
        { error: "Unauthorized - You can only delete your own comments" },
        { status: 403 }
      );
    }

    await deleteDoc(commentRef);

    // Update post comments count
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      comments: increment(-1)
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 }
    );
  }
} 
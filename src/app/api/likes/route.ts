import { NextResponse } from "next/server";
import { db } from "@/lib/firebase/firebase";
import { verifyToken } from "@/lib/firebase/admin";
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  getDoc,
  updateDoc,
  increment,
  getDocs,
  query,
  where
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

// POST /api/likes - Toggle like for a post (like/unlike)
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
    const { postId } = body;

    if (!postId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already liked the post
    const likesQuery = query(
      collection(db, "likes"),
      where("postId", "==", postId),
      where("userId", "==", userId)
    );
    
    const likeSnapshot = await getDocs(likesQuery);
    
    if (!likeSnapshot.empty) {
      // User already liked this post, so unlike it
      const likeDoc = likeSnapshot.docs[0];
      await deleteDoc(doc(db, "likes", likeDoc.id));
      
      // Update post likes count (decrement)
      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, {
        likes: increment(-1)
      });
      
      return NextResponse.json({ success: true, action: "unliked" });
    } else {
      // User hasn't liked this post yet, so like it
      await addDoc(collection(db, "likes"), {
        postId,
        userId,
        createdAt: new Date().toISOString()
      });

      // Update post likes count (increment)
      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, {
        likes: increment(1)
      });
      
      return NextResponse.json({ success: true, action: "liked" });
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    return NextResponse.json(
      { error: "Failed to toggle like status" },
      { status: 500 }
    );
  }
}

// GET /api/likes - Check if user liked a post
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

    const userId = decodedToken.uid;
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user liked the post
    const likesQuery = query(
      collection(db, "likes"),
      where("postId", "==", postId),
      where("userId", "==", userId)
    );
    
    const likeSnapshot = await getDocs(likesQuery);
    
    return NextResponse.json({ liked: !likeSnapshot.empty });
  } catch (error) {
    console.error("Error checking like status:", error);
    return NextResponse.json(
      { error: "Failed to check like status" },
      { status: 500 }
    );
  }
} 
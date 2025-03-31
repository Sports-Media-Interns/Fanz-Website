import { db } from "./firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  Unsubscribe,
  DocumentData,
  limit,
  doc
} from "firebase/firestore";

// Subscribe to posts updates
export const subscribeToPosts = (
  callback: (posts: DocumentData[]) => void,
  pageSize: number = 10
): Unsubscribe => {
  const postsQuery = query(
    collection(db, "posts"),
    orderBy("createdAt", "desc"),
    limit(pageSize)
  );

  return onSnapshot(postsQuery, (snapshot) => {
    const posts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(posts);
  });
};

// Subscribe to comments for a specific post
export const subscribeToComments = (
  postId: string,
  callback: (comments: DocumentData[]) => void
): Unsubscribe => {
  const commentsQuery = query(
    collection(db, "comments"),
    where("postId", "==", postId),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(commentsQuery, (snapshot) => {
    const comments = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(comments);
  });
};

// Subscribe to likes count for a specific post
export const subscribeToLikesCount = (
  postId: string,
  callback: (likesCount: number) => void
): Unsubscribe => {
  const postRef = doc(db, "posts", postId);
  
  return onSnapshot(postRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data().likes || 0);
    }
  });
};

// Subscribe to comments count for a specific post
export const subscribeToCommentsCount = (
  postId: string,
  callback: (commentsCount: number) => void
): Unsubscribe => {
  const postRef = doc(db, "posts", postId);
  
  return onSnapshot(postRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data().comments || 0);
    }
  });
}; 
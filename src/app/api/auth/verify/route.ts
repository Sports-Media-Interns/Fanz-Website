'use server';

import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/firebase/admin";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();
    
    if (!token) {
      return NextResponse.json(
        { error: "No token provided" },
        { status: 401 }
      );
    }

    const decodedToken = await verifyToken(token);
    
    if (!decodedToken) {
      return NextResponse.json(
        { error: "Invalid token", valid: false },
        { status: 401 }
      );
    }
    
    return NextResponse.json({ 
      userId: decodedToken.uid,
      email: decodedToken.email,
      valid: true
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json(
      { error: "Failed to verify token", valid: false },
      { status: 500 }
    );
  }
} 
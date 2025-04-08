/* actions.ts */
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server'; // Ensure this path is correct

// Define expected shape of the state returned by actions for useFormState
interface ActionResult {
  message: string;
}

export async function login(prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  const supabase = await createClient(); // Use your server client creator

  // Basic validation (consider using a library like Zod for robust validation)
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { message: 'Failed: Email and Password are required.' };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error('Login Error:', error.message);
    // Return specific error messages instead of redirecting immediately
    return { message: `Failed: ${error.message}` };
    // Or redirect on error if preferred: redirect('/login?error=' + encodeURIComponent(error.message));
  }

  // Revalidate and redirect on SUCCESS
  revalidatePath('/', 'layout');
  redirect('/'); // Redirect to dashboard or home page after successful login

  // Note: redirect() throws an error, so this return is technically unreachable on success
  // return { message: 'Login successful!' };
}

export async function signup(prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  const supabase = await createClient();

  // Extract and validate inputs
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const firstName = formData.get('firstName') as string; // Get first name
  const lastName = formData.get('lastName') as string; // Get last name

  if (!email || !password || !firstName || !lastName) {
     return { message: 'Error: All fields are required.' };
  }

  if (password.length < 6) {
     return { message: 'Error: Password must be at least 6 characters long.' };
  }

  // Call Supabase signUp with user data
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      // Pass additional data for profile creation (requires Supabase table/trigger setup)
      data: {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        // full_name: `${firstName.trim()} ${lastName.trim()}` // Example if needed
      },
      // If email confirmation is enabled in Supabase, specify the confirmation URL
      // emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`, // Adjust URL as needed
    },
  });

  if (error) {
    console.error('Signup Error:', error.message);
    return { message: `Error: ${error.message}` };
    // Or redirect on error: redirect('/login?error=' + encodeURIComponent(error.message));
  }

  // Handle Email Confirmation Flow
  const needsEmailConfirmation = data.user && !data.session; // Check if confirmation is likely needed

  if (needsEmailConfirmation) {
      // Don't redirect immediately. Return a success message prompting email check.
      // Optionally, you could redirect to a specific "check your email" page:
      // redirect('/auth/check-email');
      return { message: 'Success! Please check your email to confirm your account.' };
  }

  // If no email confirmation needed OR it's handled by redirecting above:
  revalidatePath('/', 'layout');
  // Redirect only if signup is fully complete (e.g., email confirmation off or handled by emailRedirectTo)
   redirect('/'); // Redirect to dashboard or home page
   // return { message: 'Signup successful!' }; // Technically unreachable after redirect
}
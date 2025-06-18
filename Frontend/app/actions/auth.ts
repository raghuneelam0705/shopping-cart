import { SignupFormSchema, FormState } from '@/app/lib/definitions'
import { toast } from 'react-toastify';

import bcrypt from 'bcryptjs'
 
export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
 
  // Call the provider or db to create a user...
    // 2. Prepare data for insertion into database
    const { email, password } = validatedFields.data
    // e.g. Hash the user's password before storing it
   
   
   const response = await fetch('http://localhost:3002/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if(response.ok) {
    toast('Succesfully signed up!', {
      type: 'success'})
  }else{
    const errorData = await response.json();
    toast(`Error: ${errorData.error}`, {
      type: 'error'
    });
  }
  
}

export async function signin(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
 
  // Call the provider or db to create a user...
    // 2. Prepare data for insertion into database
    const { email, password } = validatedFields.data
    // e.g. Hash the user's password before storing it
   
   
   const response = await fetch('http://localhost:3002/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if(response.ok) {
    const data = await response.json();
    toast(data.message, {
      type: 'success'})
  }else{
    const errorData = await response.json();
    toast(`Error: ${errorData.error}`, {
      type: 'error'
    });
  }
  
}
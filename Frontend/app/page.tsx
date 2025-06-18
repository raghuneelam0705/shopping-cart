'use client'
import React from 'react'
import SignupForm from './SignUp/page';
import SignInForm from './SignIn/page';
const page = () => {
  const [isSignUp, setIsSignUp] = React.useState(false);
  return (
    <div>
      {isSignUp ? <SignupForm onClick={() => setIsSignUp((prev) => !prev)} /> : <SignInForm onClick={() => setIsSignUp((prev) => !prev)} />}
    </div>
  )
}

export default page

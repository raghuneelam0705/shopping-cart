'use client'
import { useRouter } from "next/navigation";
const page = () => {
    const Router = useRouter() ;

    const  onBack = () => {
   Router.back()
     }
  return (
    <div>
      <h1>This is application Home page</h1>
   <button onClick={onBack}> Go Home</button>
    </div>
  )
}

export default page

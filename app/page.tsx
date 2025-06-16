'use client'
import { useRouter } from "next/navigation";

export default function Home() {
  const Router = useRouter() ;

 const  onRedircttohome = () => {
Router.push('/Home')
  }
  return (
    <div>
   <h1> welcome to My Application</h1>
   <button onClick={onRedircttohome}> Go Home</button>
    </div>
  );
}

import Image from "next/image";
import styles from '@/app/ui/home.module.css';
import clsx from "clsx";
import { Button } from "@/components/ui/button"
import {LandingText,SearchInput,LogoHolder} from '../components/ui/LandingPage.js'
export default function Home() {
  return (
<>  
<div className=" p-8 flex gap-">
  <LogoHolder></LogoHolder>
 <Button className="bg-stone-500" >Sign Up</Button> 
</div>
<div className="flex flex-col items-center justify-center min-h-screen px-4">
 <div className="w-full max-w-md p-6 space-y-4 text-center">
 <LandingText></LandingText>
 <SearchInput></SearchInput>
</div>
</div>
</>
  

  );
}

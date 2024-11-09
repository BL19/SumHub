import Image from "next/image";
import styles from '@/app/ui/home.module.css';
import clsx from "clsx";
import { Button } from "@/components/ui/button"
import {LandingText,SearchInput,LogoHolder} from '../components/ui/LandingPage.js'
export default function Home() {
  return (
<div className="min-h-screen flex flex-col">
  <div className=" p-8 flex justify-between items-center">
  <LogoHolder></LogoHolder>
  <div> 
  <Button variant="ghost" >Login</Button> 
  <Button className="ml-2" >Sign Up</Button> </div>
 
</div>
<div className="flex-grow flex flex-col items-center justify-center px-4">
 <div className="w-full max-w-md p-6 space-y-4 text-cente">
 <LandingText></LandingText>
 <SearchInput></SearchInput>
</div>
</div></div>


  

  );
}

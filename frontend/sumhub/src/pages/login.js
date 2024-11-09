'use strict';

import { Button } from "@/components/ui/button"
import {LogoHolder} from '../components/ui/LandingPage.js'
import "@/app/globals.css";

export default function SearchingMain()
{
    return (
        <div className="min-h-screen flex flex-col">
        <div className=" p-8 flex justify-between items-center">
        <LogoHolder></LogoHolder>
        <div> 
        <Button variant="ghost">Login</Button> 
        <Button className="ml-2" >Sign Up</Button> </div>
      </div >

      <div className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md p-9 space-y-4 text-center">
        <span class="loader"></span>
          <div className="text-3xl font-bold	">This may take a few seconds...</div>
        </div>
      </div>
      
      </div>
    );
}

'use strict';

import { Button } from "@/components/ui/button"
import {LandingText,SearchInput,LogoHolder} from '../components/ui/LandingPage.js'
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
      </div>
      <span class="loader">This may take a few seconds...</span>
      </div>
    );
}

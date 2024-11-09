import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export function EmailPassInput() {
  return (<><Input type="email" placeholder="Email Address" />
  <Input type="password" placeholder="Password" /></>
);
}

export function SignInText(){
  return (<><p class="font-black text-3xl	">Sign in to Sumhub</p>
  <p class="text-slate-600">Enter your account details bellow</p>
  </>);
}
export function SignInButton(props){
  return (<Button>{props.input}</Button>)
}



export function CustomCheckbox(props) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={props.text} />
      <label
        htmlFor={props.text}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {props.text}    
 </label>
    </div>
  );
}

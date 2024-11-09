import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


export function LandingText(){
    return (<div ><p className="font-black text-5xl mt-5 mb-5">
        Speed Up Your Research Game
            </p>
            <p className="text-xl mt-5 mb-5 font-semibold">Find research papers fast.Our AI searches and summarizes studies in seconds,
                streamlining your research.
            </p>
            </div>);
}
export function SearchInput(){
    return (
        <div className="flex w-full max-w-sm items-center space-x-2 ">
        <Input type="text" placeholder="E.g. Computer Science" />
        <Button type="submit">Search</Button>
      </div>
  
    );
}

export function LogoHolder(){
    return ( 
        <svg id="Lager_1" data-name="Lager 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 355.68 65.05" width="200" height="60"  >
        <defs>
          <style>
            {`
              .cls-1 {
                fill: #1d1d1b;
                stroke-width: 0px;
              }
            `}
          </style>
        </defs>
        <g>
          <polygon className="cls-1" points="64.9 32.56 32.47 65.05 32.45 32.56 64.9 32.56"/>
          <polygon className="cls-1" points="0 32.49 32.42 0 32.44 32.49 0 32.49"/>
          <polygon className="cls-1" points="32.43 65 .07 65.04 16.26 48.83 32.43 65"/>
          <polygon className="cls-1" points="32.42 .1 64.85 .06 48.63 16.31 32.42 .1"/>
        </g>
        <g>
          <path className="cls-1" d="M117.51,56.94c-15.95,0-22.61-6.79-22.61-18.51h12.04c0,6.41,2.5,8.78,10.83,8.78,5.7,0,8.2-1.15,8.2-3.97,0-1.6-1.28-2.82-3.84-3.46l-15.12-3.97c-7.82-2.11-10.25-6.66-10.25-12.36,0-8.78,6.53-13.45,18.39-13.45,14.09,0,21.08,6.66,21.08,16.46h-11.98c0-4.87-2.75-6.92-8.9-6.92-4.29,0-6.53,1.09-6.53,3.65,0,1.28.7,2.37,3.52,3.14l14.67,3.65c7.5,1.86,10.95,6.15,10.95,12.75,0,8.58-5.89,14.22-20.44,14.22Z"/>
          <path className="cls-1" d="M139.36,40.86v-17.23h11.02v15.44c0,5.83,1.6,7.94,6.47,7.94,5.32,0,8.9-2.5,8.9-11.66v-11.72h10.95v32.42h-10.95v-3.65l2.05-6.09h-2.69c-1.28,5.77-5.32,10.38-12.24,10.38-8.39,0-13.52-5.57-13.52-15.82Z"/>
          <path className="cls-1" d="M179.52,23.63h10.95v2.88l-2.05,6.15h2.69c1.28-5.77,4.16-9.67,10.51-9.67s8.65,4.1,9.61,9.67h1.92c1.28-5.77,4.04-9.67,10.38-9.67,8.46,0,10.76,7.75,10.76,16.53v16.53h-10.95v-15.82c0-6.15-.96-7.56-4.55-7.56-5.38,0-6.41,4.61-6.41,12.36v11.02h-11.02l.06-.13v-15.7c0-6.15-.96-7.56-4.55-7.56-5.38,0-6.41,4.61-6.41,12.36v11.02h-10.95V23.63Z"/>
          <path className="cls-1" d="M236.75,8.96h10.95v18.32l-2.11,6.09h2.75c1.35-5.77,5.38-10.38,12.24-10.38,8.39,0,13.52,5.7,13.52,15.89v17.17h-11.08v-15.44c0-5.83-1.54-7.94-6.41-7.94-5.38,0-8.9,2.56-8.9,11.72v11.66h-10.95V8.96Z"/>
          <path className="cls-1" d="M276.51,40.86v-17.23h11.02v15.44c0,5.83,1.6,7.94,6.47,7.94,5.32,0,8.9-2.5,8.9-11.66v-11.72h10.95v32.42h-10.95v-3.65l2.05-6.09h-2.69c-1.28,5.77-5.32,10.38-12.24,10.38-8.39,0-13.52-5.57-13.52-15.82Z"/>
          <path className="cls-1" d="M317.49,8.96h10.95v16.21l-2.05,6.09h2.69c1.67-4.16,4.55-8.26,12.62-8.26,9.48,0,13.97,7.75,13.97,16.78s-4.48,16.91-13.97,16.91c-8.07,0-10.95-4.1-12.62-8.33h-2.69l2.05,6.15v1.54h-10.95V8.96ZM336.52,47.01c5.45,0,8.2-2.18,8.2-7.24s-2.75-7.11-8.2-7.11-8.07,2.11-8.07,7.11,2.69,7.24,8.07,7.24Z"/>
        </g>
      </svg>
     );
}


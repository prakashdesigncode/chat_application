import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

/*
@params  - param1 : string
@useAges - this hook working on input field
@like    - TextFelid etc...
*/
export const useInputHook = (defaultValue='') => {
  const [state, setState] = useState(defaultValue);
  const handleChange = (event) => setState(event.target.value);
  return [state, handleChange];
};

/*
@params  - param1 : boolean
@useAges - this hook working any boolean based Compound toggle
@like    - Dialog etc...
*/
export const useBooleanHook = (defaultValue=false) => {
  const [state, setState] = useState(defaultValue);
  const handleChange = (value) => setState(value);
  return [state, handleChange];
};

/*
@params  - param1 : string
@useAges - make fullscreen the ui etc...
*/
export const useFullScreen = (id='') => {
   useEffect(() => {
     const handleFullScreen = () => {
       const element = document.getElementById(id);
       const isFullScreen = document.fullscreenElement;
       if (!isFullScreen) element.requestFullscreen();
     };
     document.addEventListener("click", handleFullScreen);
     return () => document?.removeEventListener("click", handleFullScreen);
   }, []);
};

/*
@params  - param1 : react-ref , param2 : array
@useAges - the last message scroll into view on screen
 */
export const useScrollIntoView = (ref,depency=[])=>{
  useEffect(()=>{
    if(ref.current) ref.current.scrollIntoView({ behavior: 'smooth' });
  },[depency])
}

export const useQueryParams = ()=>{
  const [searchParams, setSearchParams] = useSearchParams();
  const handleParams = (query)=> setSearchParams(query)
  return [searchParams,handleParams]
}


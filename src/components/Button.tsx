import React from "react";

interface IButtonProps{
    canClick:boolean;
    loading:boolean;
    actionText:string;
}
export const Button:React.FC<IButtonProps> = ({canClick, loading, actionText})=>{
 return <button className={`text-lg focus:outline-none font-medium text-white  py-4  transition-colors ${canClick?"bg-emerald-600\n" +
     "hover:bg-emerald-700":"bg-gray-300 pointer-events-none"} `}>{loading? "loading...": `${actionText}`}</button>
}
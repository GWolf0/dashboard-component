import { useEffect, useState } from "react";

function DBSnackbar({type,message,onDispose}){
//states
const [opacity,setOpacity]=useState('1');

//methods
function thisOnDispose(){
    setOpacity('0');
    setTimeout(onDispose,300);
}

const bgColor=type=='info'?'bg-blue-300':type=='success'?'bg-green-300':type=="warning"?'bg-amber-300':type=="error"?'bg-red-300':'bg-gray-300';
const txtColor=type=='info'?'text-blue-700':type=='success'?'text-green-700':type=="warning"?'text-amber-700':type=="error"?'text-red-700':'text-gray-700';
return(
<div className={`dbSnackbar z-10 ml-auto shadow rounded w-fit px-4 py-2 ${bgColor} ${txtColor} flex items-center justify-between`} style={{maxWidth:'95vw',opacity:opacity,transition:'opacity 0.3s'}}>
    <p className="font-bold">{message}</p>
    <button onClick={thisOnDispose} className="p-2 font-bold text-lg hover:opacity-70">&times;</button>
</div>
);

}

DBSnackbar.defaultProps={
    type:"",
    message:""
};

export default DBSnackbar;

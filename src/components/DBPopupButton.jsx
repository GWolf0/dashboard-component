import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import dashboardSettings from "../dashboardSettings";

function DBPopupButton({actions,bgColor,width,height,menuWidth,textColor,icon,label,fontSize,radius,padding,bordered}){
//refs
const thisRef=useRef();
//states
const [isOn,setIsOn]=useState(false);
//effects
useEffect(()=>{
},[]);
useEffect(()=>{
    function onDocClick(e){
        if(isOn&&e.target!=thisRef.current&&!thisRef.current.contains(e.target)){
           setIsOn(false);
        }
    }
    document.addEventListener('click',onDocClick);
    return ()=>{
        document.removeEventListener('click',onDocClick);
    }
},[isOn]);
//methods
function toggleIsOn(e){
    setIsOn(prev=>!prev);
    e.stopPropagation();
}


return(
<button ref={thisRef} onClick={toggleIsOn}
    className={`relative ${bordered?'border border-semitrans':''} hover:border-accent`}
    style={{minWidth:width,height:height,backgroundColor:bgColor,color:textColor,fontSize:fontSize,borderRadius:radius,padding:padding}}
>
    {icon}{label!=''&&<p className="ml-2 inline-block" style={{color:textColor}}>{label}</p>}
    <ul className="dashboardPopupActionsList absolute rounded shadow-lg shadow-semitrans overflow-hidden" style={{display:isOn?'block':'none',top:(parseInt(height)+5)+'px',right:'0px',width:menuWidth,padding:'0 0.25rem',backgroundColor:bgColor,color:textColor}}>
        {
            actions.map((action,i)=>(
                <li key={i} className={`py-2 border-none border-semitrans text-sm text-primary hover:opacity-70`} onClick={action.onClick}><p style={{textAlign:'center'}}>{action.label}</p></li>
            ))
        }
    </ul>
</button>
);

}

DBPopupButton.defaultProps={
    bordered:true,
    bgColor:'initial',
    textColor:dashboardSettings.colors.dark,
    width:'48px',
    height:'48px',
    menuWidth:'256px',
    size:'48px',
    radius:'50%',
    label:'',
    fontSize:'1rem',
    padding:'0'
};

export default DBPopupButton;


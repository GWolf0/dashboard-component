import { useState } from "react";

function DBDialog({title,size,onDispose,children,actions}){
//states
const [opacity,setOpacity]=useState('1');

//methods
function thisOnDispose(){
    setOpacity('0');
    setTimeout(onDispose,200);
}
function onAction(actionCallback){
    if(!actionCallback)return thisOnDispose();
    const dispose=actionCallback();
    if(dispose==true)thisOnDispose();
}


const width=size=='md'?'480px':size=='sm'?'360px':size=="lg"?'720px':'480px';
return(
<div className="dbDialog fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-lighter rounded shadow overflow-hidden grid" style={{gridTemplateRows:'60px auto 48px',maxWidth:'95vw',width:width,opacity:opacity,transition:'opacity 0.2s'}}>
    <section className="dbDialogHeader border-none border-semitrans flex items-center justify-between px-4">
        <p className="text-dark font-bold">{title}</p>
        <button onClick={thisOnDispose} className="text-red-300 text-lg">&times;</button>
    </section>
    <section className="dbDialogBody py-2" style={{maxHeight:'95vh'}}>
        {children}
    </section>
    {actions.length>0&&
        <section className="dbDialogActions flex items-center justify-end px-4">
            {
                actions.map((a,i)=>(
                    <button key={i} className={`p-2 rounded ${a.primary?'text-primary':'text-dark'} ml-1 font-bold`} onClick={()=>onAction(a.onClick)}>{a.name}</button>
                ))
            }
        </section>
    }
</div>
)
}

DBDialog.defaultProps={
    size:"md"
}

export default DBDialog;

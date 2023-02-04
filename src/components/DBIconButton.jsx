import dashboardSettings from "../dashboardSettings";

function DBIconButton({bgColor,textColor,width,height,icon,label,fontSize,radius,padding,onClick}){

return(
<button onClick={onClick}
    className="hover:opacity-70"
    style={{padding:padding,minWidth:width,height:height,backgroundColor:bgColor,color:textColor,fontSize:fontSize,borderRadius:radius}}>
    {icon}{label!=''&&<p className="inline-block ml-1" style={{color:textColor}}>{label}</p>}
</button>
);

}

DBIconButton.defaultProps={
    bgColor:'initial',
    textColor:dashboardSettings.colors.dark,
    width:'48px',
    height:'48px',
    radius:'50%',
    label:'',
    fontSize:'1rem',
    padding:'0'
};

export default DBIconButton;


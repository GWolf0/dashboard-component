import dashboardSettings from "../dashboardSettings";

function DBSideBarButton({bgColor,textColor,height,leading,label,trailing,fontSize,radius,onClick,mini,active}){
const bgColorSave=bgColor;
bgColor=active?textColor:bgColor;
textColor=active?bgColorSave:textColor;

return mini?
<button onClick={onClick} className={`flex items-center justify-center w-full`} style={{height:height,backgroundColor:bgColor,color:textColor,fontSize:fontSize,borderRadius:radius}}>
    {leading?<div>{leading}</div>:<p style={{color:textColor,fontWeight:'bold',textAlign:'center'}}>{label.substr(0,1)}</p>}
</button>
:(
<button onClick={onClick} className={`px-4 flex items-center w-full`} style={{height:height,backgroundColor:bgColor,color:textColor,fontSize:fontSize,borderTopLeftRadius:radius,borderBottomLeftRadius:radius}}>
    {leading&&<div className="mr-4">{leading}</div>}
    <p style={{color:textColor}}>{label}</p>
    {trailing&&<div className="ml-auto">{trailing}</div>}
</button>
);

}

DBSideBarButton.defaultProps={
    bgColor:'inherit',
    textColor:dashboardSettings.colors.lighter,
    height:'60px',
    radius:'5px',
    label:'',
    fontSize:'1rem',
    mini:false
};

export default DBSideBarButton;


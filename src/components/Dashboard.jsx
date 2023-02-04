import { useEffect, useRef, useState } from "react";
import dashboardSettings from "../dashboardSettings";
import DBService from "../services/DBService";
import DBIconButton from "./DBIconButton";
import DBSideBarButton from "./DBSideBarButton";
import DBSnackbar from "./DBSnackbar";
import DBAlertDialog from "./dialogs/DBAlertDialog";
import DBConfirmDialog from "./dialogs/DBConfirmDialog";

function Dashboard({appName,colors,sideBarBgColor,mdBreakPoint,logo,minLogo,headerHeight,sections,headerActions,footerLinks}){
//refs
const thisRef=useRef();
//states
const [mobile,setMobile]=useState(window.innerWidth<=mdBreakPoint);
const [sideBarExpanded,setSideBarExpanded]=useState(!mobile);
const [currentSectionIdx,setCurrentSectionIdx]=useState(0);
const [footerVisible,setFooterVisible]=useState(false);
const [snackbars,setSnackbars]=useState([
    {id:Math.floor(Math.random()*1000),type:'info',message:'This is a test info snackbar!'},
    // {id:Math.floor(Math.random()*1000),type:'error',message:'This is a test error snackbar!'},
    // {id:Math.floor(Math.random()*1000),type:'warning',message:'This is a test warning snackbar!'},
    // {id:Math.floor(Math.random()*1000),type:'success',message:'This is a test success snackbar!'}
]);
const [dilaogs,setDialogs]=useState([
    //{id:Math.floor(Math.random()*1000),type:'alert',message:'This is a test alert dialog!'},
    //{id:Math.floor(Math.random()*1000),type:'confirm',message:'This is a test confirm dialog!'}
]);
//effects
useEffect(()=>{
    //init dbservice
    DBService.init(thisRef.current);
    //snackbar event
    function onDBSnackbar(e){
        const newSnackbar={id:Math.floor(Math.random()*1000),...e.detail.snackbar};
        //console.log('on dbsnackbar',newSnackbar);
        setSnackbars(prev=>[...prev,newSnackbar]);
    }
    document.addEventListener('dbsnackbar',onDBSnackbar);
    //dialogs events
    function onDBDialog(e){
        const newDialog={id:Math.floor(Math.random()*1000),...e.detail.dialog};
        //console.log('on dialog',newDialog);
        setDialogs(prev=>[...prev,newDialog]);
    }
    document.addEventListener('dbalertdialog',onDBDialog);
    document.addEventListener('dbconfirmdialog',onDBDialog);
    //resize event
    function onWindowResize(e){
        setMobile(window.innerWidth<=mdBreakPoint);
    }
    window.addEventListener('resize',onWindowResize);
    //
    return ()=>{
        window.removeEventListener('resize',onWindowResize);
        document.removeEventListener('dbsnackbar',onDBSnackbar);
    }
},[]);
useEffect(()=>{
    setSideBarExpanded(!mobile);
},[mobile]);
useEffect(()=>{//console.log(footerVisible)
    if(footerVisible){
        document.getElementById('dashboardFooter').scrollIntoView();
    }else{
        document.getElementById('dashboardLogo').scrollIntoView();
    }
},[footerVisible]);

//methods
function toggleSideBarExpandState(){
    setSideBarExpanded(prev=>!prev);
}
function onSwitchSection(sectionIdx){
    setCurrentSectionIdx(sectionIdx);
}
function onFooterToggle(){
    setFooterVisible(prev=>!prev);
}
//dispose snackbar
function onDisposeSnackbar(id){
    setSnackbars(prev=>prev.filter((s,i)=>s.id!==id));
}
//dispose dialog
function onDisposeDialog(id){
    setDialogs(prev=>prev.filter((d,i)=>d.id!==id));
}

//getters

const section=sections[currentSectionIdx];
return(
<div ref={thisRef} className="dashboard w-screen h-screen bg-lighter grid overflow-x-hidden overflow-y-hidden" style={{gridTemplateRows:'100vh auto'}}>
    <section className="dashboardMainContent flex flex-row">
        <section className={`dashboardSideBar ${sideBarBgColor} flex flex-col overflow-y-auto`} style={{width:!sideBarExpanded?'56px':'256px',transition:'width 0.2s'}}>
            <div id="dashboardLogo" className={`dashboardLogo w-full flex flex-row items-center ${mobile||!sideBarExpanded?'justify-center':'justify-between'} ${mobile||!sideBarExpanded?'px-0':'px-4'}`} style={{height:headerHeight}}>
                {
                    (sideBarExpanded)&&
                    (logo!=null?logo:<p className="font-bold text-lg text-lighter">{appName}</p>)
                }
                {
                    mobile?
                    (minLogo!=null?minLogo:<p className="w-full text-center text-lg font-bold text-lighter">{appName.substr(0,1)}</p>)
                    :
                    <DBIconButton onClick={toggleSideBarExpandState} textColor={colors.lighter} icon={<i className="bi-list"></i>} fontSize="1.2rem" />
                }
            </div>
            <ul className="dashboardSideBarButtons list-style-none w-full mt-4" style={{padding:`0rem ${!sideBarExpanded?'0.25rem':'0'} 0rem ${!sideBarExpanded?'0.25rem':'1rem'}`}}>
                {
                    sections.map((section,i)=>(
                        <li key={i}>
                            <DBSideBarButton onClick={()=>onSwitchSection(i)} active={currentSectionIdx==i} mini={!sideBarExpanded} label={section.title} leading={section.icon} trailing={section.trailing??null} />
                        </li>
                    ))
                }
            </ul>
            <div className="mt-auto p-1 md:p-2" style={{display:footerLinks.length>0?'block':'none'}}>
                <button onClick={onFooterToggle} className="py-2 w-full rounded border border-darkprimary bg-inherit text-lighter text-sm hover:opacity-70">{!sideBarExpanded||mobile?'':'Links'} <i className="bi-caret-down-fill inline-block transition-transform" style={{transform:`rotate(${footerVisible?'180deg':'0deg'})`}}></i></button>
            </div>
        </section>
        <section className="dashboardContent grow basis-0 bg-lighter grid" style={{gridTemplateRows:`${headerHeight} minmax(0,auto)`}}>
            <header className="dashboardHeader w-full flex items-center px-2 md:px-4">
                <p className="text-dark font-bold text-lg">{section.title}</p>
                <div className="dashboardHeaderActions ml-auto flex items-center">
                    {
                        headerActions.map((action,i)=>(
                            <div key={i} className="ml-1.5">{action}</div>
                        ))
                    }
                </div>
            </header>
            <main className="dashboardMainContent overflow-y-auto overflow-x-hidden px-2 md:px-4">
                {section.component}
            </main>
        </section>
    </section>
    <footer id="dashboardFooter" className="dahsboardFooter bg-lighter border-t border-light">
        <div className="py-4 pt-8 px-4 text-sm font-semibold text-dark">&copy; {new Date().getFullYear()} {appName.toUpperCase()}</div>
        <ul className="py-8 px-4 flex flex-col md:flex-row">
            {
                footerLinks.map((link,i)=>(
                    <li key={i} className="py-2 text-sm md:text-base">{link}</li>
                ))
            }
        </ul>
        
    </footer>
    {/* //snackbars */}
    <div className="snackbarsContainer fixed bottom-0 right-0 px-1 md:px-4">
        {
            snackbars.map((s,i)=>(
                <div key={s.id} className="my-1">
                    <DBSnackbar type={s.type} message={s.message} onDispose={()=>onDisposeSnackbar(s.id)} />
                </div>
            ))
        }
    </div>
    {/* //dialogs */}
    {dilaogs.length>0&&<div className="dbDialogsOverlay fixed w-screen h-screen bg-semitrans"></div>}
    {
        dilaogs.map((d,i)=>{
            const type=d.type;
            if(type=="alert")return <DBAlertDialog key={d.id} title={d.title} message={d.message} onDispose={()=>onDisposeDialog(d.id)} />
            else if(type=="confirm")return <DBConfirmDialog key={d.id} title={d.title} message={d.message} onDispose={()=>onDisposeDialog(d.id)} />
        })
    }
</div>
);

}

Dashboard.defaultProps={
    appName:'Dashboard',
    colors:dashboardSettings.colors,
    sideBarBgColor:'bg-primary',
    mdBreakPoint:720,
    headerHeight:'80px',
    sections:[],
    headerActions:[],
    footerLinks:[]
};

export default Dashboard;

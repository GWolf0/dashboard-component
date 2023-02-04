import DBService from "../../services/DBService";
import DBDialog from "./DBDialog";

function DBConfirmDialog({title,message,onDispose,booleanValues}){

//methods
function onPositiveValue(){
    //console.log("pos");
    DBService.confirmDialogResponse=true;
    return true;
}
function onNegativeValue(){
    //console.log("neg");
    DBService.confirmDialogResponse=false;
    return true;    
}

return(
<DBDialog title={title} onDispose={onDispose} actions={
    [
        {name:booleanValues[1],onClick:onNegativeValue},
        {name:booleanValues[0],primary:true,onClick:onPositiveValue}
    ]
}>
    <div className="px-4 py-4">
        <p className="text-dark">{message}</p>
    </div>
</DBDialog>
);
}

DBConfirmDialog.defaultProps={
    title:'Confirm',
    booleanValues:["Yes","No"]
}

export default DBConfirmDialog;

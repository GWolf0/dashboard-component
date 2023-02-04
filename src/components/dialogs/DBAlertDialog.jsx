import DBDialog from "./DBDialog";

function DBAlertDialog({title,message,onDispose}){


return(
<DBDialog title={title} onDispose={onDispose} actions={[{name:'ok',primary:true}]}>
    <div className="px-4 py-4">
        <p className="text-dark">{message}</p>
    </div>
</DBDialog>
);
}

DBAlertDialog.defaultProps={
    title:'Alert'
}

export default DBAlertDialog;

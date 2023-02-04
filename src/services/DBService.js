
class DBService{
    static elem;
    static blockingInterval;
    static confirmDialogResponse;

    static init(val){
        DBService.elem=val;
        DBService.confirmDialogResponse=null;
    }

    //helpers
    //show snackbar
    static showSnackbar(snackbar){
        //console.log('snackbar',snackbar)
        document.dispatchEvent(new CustomEvent('dbsnackbar',{detail:{snackbar}}));
    }
    //show alert dialog
    static showAlertDialog(dialog){
        //console.log('alertdialog',dialog)
        document.dispatchEvent(new CustomEvent('dbalertdialog',{detail:{dialog:{type:'alert',...dialog}}}));
    }
    //show confirm dialog
    static async showConfirmDialog(dialog){
        //console.log('alertdialog',dialog)
        DBService.confirmDialogResponse=null;
        document.dispatchEvent(new CustomEvent('dbconfirmdialog',{detail:{dialog:{type:'confirm',...dialog}}}));
        return new Promise((resolve)=>{
            DBService.blockingInterval=setInterval(()=>{//console.log(DBService.confirmDialogResponse)
                if(DBService.confirmDialogResponse!=null){
                    const res=DBService.confirmDialogResponse;
                    DBService.confirmDialogResponse=null;
                    clearInterval(DBService.blockingInterval);
                    resolve(res);
                }
            },200);
        },(reject)=>{
            console.log("Error: error getting confirm dialog response!");
            reject("Error: error getting confirm dialog response!");
        });
    }

}

export default DBService;


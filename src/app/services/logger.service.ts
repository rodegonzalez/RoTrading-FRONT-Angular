import { environment } from '../environment/global.environment';

export enum Tlog {
    info,
    warn,
    error,
  };

export class LoggerService {

    constructor() {}
    log(tlog: Tlog, msg: any){

        if (environment.logging){

            //var currdate: string = Date.toLocaleString();
            //msg = currdate + " - " + msg;
            
            if (typeof(msg) == "string"){
                switch (tlog){
                    case Tlog.info: 
                        msg = "/INFO/: " + msg;
                        break;
                    case Tlog.warn: 
                        msg = "/WARNING/: " + msg;
                        break;
                    case Tlog.error: 
                        msg = "/ERROR/: " + msg;
                        break;
                }
            }else{
                switch (tlog){
                    case Tlog.info: 
                        console.log("/INFO/: ");
                        break;
                    case Tlog.warn: 
                        console.log("/WARNING/: ");
                        break;
                    case Tlog.error: 
                        console.log("/ERROR/: ");
                        break;
                }
            }            
            console.log(msg);
        }
    }
}

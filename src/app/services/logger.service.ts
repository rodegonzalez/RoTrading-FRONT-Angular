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
    
            switch (tlog){
                case Tlog.info: 
                    msg = "/INFO/ " + msg;
                    break;
                case Tlog.warn: 
                    msg = "/WARNING/ " + msg;
                    break;
                case Tlog.error: 
                    msg = "/ERROR/ " + msg;
                    break;
            }

            console.log(msg);
        }
    }
}

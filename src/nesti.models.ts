import { MaybeDocument } from "nano"
export namespace Nesti {
    export interface DbOption {
        host: string 
        port: number
        protocol: string 
        username?: string;
        password?: string;
        dbname:string;
    }
    export interface OnResult<T extends MaybeDocument>{
        ok:boolean;
        data?:T;
        message?:string;
        error?:Error;
    }
    export class Result{
        static success = <T extends MaybeDocument>(data?:T,message?:string):OnResult<MaybeDocument>=>{
            return {
                ok:true,
                message:message,
                data:data
            }
        }
        static fail = (error:Error):OnResult<MaybeDocument>=>{
            return{
                ok:false,
                error:error
            }
        }
    }
}
import { Request } from "express";
export interface IgetUserAuthInfoRequest  extends Request {
    token: String;
}
export interface Student {
    ID?: number;
    First_Name: string;
    Last_Name: string;
    DOB: string;
    Mobile_No: string;
    Address: string;
    editing: boolean;
    myFile: string|undefined;
    userID:number;
    file:string;
    };

    export interface ResponseApi {
       success : boolean;
       message?:string;
       data?: Student[];
       fetchtotal?: number;
       error?:unknown;
    }

    export interface DataType {
        pageNo?: string;
       dataNo?: string;
        fetchStudent?: string;
        sortMethod?: string;
        colName?: string;
    }
    
    export interface User {
        ID: string;
    }
    export interface UserLogin {
        userID:number;
        name?: string;
        email: string;
        password: string;
    }

    export interface fetchUser {
        userID? : number;
        file: string;
        imgID?:number;
    }
   
    
    
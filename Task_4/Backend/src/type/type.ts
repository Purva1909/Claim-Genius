 export interface Student {
    ID?: number;
    First_Name: string;
    Last_Name: string;
    DOB: string;
    Mobile_No: string;
    Address: string;
    editing: boolean;
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
    

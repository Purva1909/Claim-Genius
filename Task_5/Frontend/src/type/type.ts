export interface Record {
    ID?: number,
    First_Name: string;
    Last_Name: string;
    DOB: string;
    Mobile_No: string;
    Address: string;
    editing?: boolean;
    myFile: File|null;
    };

export interface Student {
        ID?: number;
        First_Name: string;
        Last_Name: string;
        DOB: string;
        Mobile_No: string;
        Address: string;
        editing?: boolean;
        myFile: File|null;
        };
    
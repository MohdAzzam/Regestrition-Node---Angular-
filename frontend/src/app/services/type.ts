export interface IRegister{
    email : string;
    password : string;
    firstName : string;
    lastName:string;
    phoneNumber:string;
}

export interface ILogin{
    email : string;
    password: string;
}

export interface IOAuthResponse{
    token : string;
}

import { Injectable, isDevMode } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JwtWithData, jwt, jwtWithVerified, userJwtData, userLoginData, userRegisterData } from "./UserDto";
import { LoaderService } from "./loader.service";
import { switchMap } from "rxjs";
import { environment } from "../Environments/Environment";
@Injectable({
    providedIn: 'root'
})

export class UserServices {
    
    constructor ( private http : HttpClient,
        private loaderService: LoaderService ) {  
            if(isDevMode()){
                console.log(environment);
                
            }
        }
    
    private url = environment.BACKEND_URL;

    Login ( body : userLoginData ) {
        return this.http
            .post<JwtWithData<boolean>>( `${this.url}/User/Login`, body )
            .pipe();
    };
    Register ( body : userRegisterData ) {
        return this.http
            .post<jwtWithVerified>( `${this.url}/User/CreateAccount`, body  )
            .pipe();
    };   
    VerifyEmail ( body : userLoginData ) {
        return this.http
            .post<jwt>( `${this.url}/User/VerifyEmail`, body )
            .pipe();
    }
    UpdateEmailToken( body: userJwtData ) {
        return this.http
            .post( `${this.url}/User/UpdateEmailToken`, body )
    }
    UpdatePassword ( body : userLoginData) {
        return this.http
            .post( `${this.url}/User/UpdatePassword`, body )
            .pipe();
    }
}
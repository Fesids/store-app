import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

/*@Injectable({
    providedIn: 'root'
})*/
export class TokenService {
    private readonly tokenKey = 'auth_cookie';

    constructor(private cookieService: CookieService){}


    getToken(): string | null {
        return this.cookieService.get(this.tokenKey) || null;
        
    }

    clearToken(): void {
        this.cookieService.delete(this.tokenKey, '/')
    }

    decodeToken(): any {
        const token = this.getToken();
        if(!token){
            return null;
        }

        try{
            const payload = token.split('.')[1];
            return JSON.parse(atob(payload))
        } catch(error){
            console.log('Invalid token format', error);
            return null;
        }
    }

    getUserInfo(): any {
        const decoded = this.decodeToken();
        if(!decoded){
            return null;
        }

        return {
            guid: decoded.guid,
            email: decoded.email,
            roles: decoded.roles,
            companyId: decoded.companyId,
            departmentId: decoded.departmentId
        }
    }

    hasRole(requiredRole: string): boolean {
        const decoded = this.decodeToken();
        return decoded?.roles?.includes(requiredRole) || false;
    }

    idTokenExpired(): boolean {
        const decoded = this.decodeToken();
        if(!decoded || !decoded.exp){
            return true;
        }

        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime


    }

}
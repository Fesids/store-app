import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API_URL_TOKEN } from "./api.constants";
import { catchError, Observable, of, tap } from "rxjs";
import { json } from "stream/consumers";
import { CookieService } from "ngx-cookie-service";


@Injectable({providedIn: 'root'})
export class ApiService {

    private readonly http = inject(HttpClient);
    private readonly api_url = API_URL_TOKEN//inject(API_URL_TOKEN);

    get<T>(url: string, params: HttpParams): Observable<T> {
        return this.http.get<T>(`${this.api_url}${url}`, {
            params,
            headers:  this.headers,
            withCredentials: true
        
        });
    }

    post<T, D>(url: string, data?:D): Observable<T> {
        return this.http.post<T>(`${this.api_url}${url}`, 
            JSON.stringify(data), {
                headers: this.headers,
                withCredentials: true
            }
        )
        /*return this.http.post<T>(url, data).pipe(
            tap(response => console.log('Response:', response)), 
            catchError(err => {
                console.error('HTTP error:', err);
                return of({} as T); 
            })
            );*/
    }

    put<T, D>(url: string, data: D): Observable<T>{
        return this.http.put<T>(`${this.api_url}${url}`, 
            JSON.stringify(data), {
                headers: this.headers,
                withCredentials: true
            }
        )
    }

    delete<T>(url: string): Observable<T> {
        return this.http.delete<T>(`${this.api_url}${url}`,{
            headers: this.headers,
            withCredentials: true
        } )
    }

    get headers(): HttpHeaders{
        
        const headersConfig = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
        };

       
        return new HttpHeaders(headersConfig);
    }

}
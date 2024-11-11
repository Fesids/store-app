import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API_URL } from "./api.constants";
import { catchError, Observable, of, tap } from "rxjs";
import { json } from "stream/consumers";


@Injectable({providedIn: 'root'})
export class ApiService {

    private readonly http = inject(HttpClient);
    private readonly api_url = 'http://localhost:3000/api/v1' //API_URL;

    get<T>(url: string, params?: HttpParams): Observable<T> {
        return this.http.get<T>(`${this.api_url}${url}`, {params});
    }

    post<T, D>(url: string, data?:D): Observable<T> {
        return this.http.post<T>(`${this.api_url}${url}`, 
            JSON.stringify(data), {
                headers: this.headers
            }
        )
        /*return this.http.post<T>(url, data).pipe(
            tap(response => console.log('Response:', response)), // Ensure it logs correctly
            catchError(err => {
                console.error('HTTP error:', err);
                return of({} as T); // Return a fallback observable if needed
            })
            );*/
    }

    put<T, D>(url: string, data: D): Observable<T>{
        return this.http.put<T>(`${this.api_url}${url}`, 
            JSON.stringify(data), {
                headers: this.headers
            }
        )
    }

    delete<T>(url: string): Observable<T> {
        return this.http.delete<T>(`${this.api_url}${url}`,{
            headers: this.headers
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
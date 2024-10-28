import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API_URL } from "./api.constants";
import { Observable } from "rxjs";
import { json } from "stream/consumers";


@Injectable({providedIn: 'root'})
export class ApiService {

    private readonly http = inject(HttpClient);
    private readonly api_url = API_URL;

    get<T>(url: string, params: HttpParams): Observable<T> {
        return this.http.get<T>(`${this.api_url}${url}`, {params});
    }

    post<T, D>(url: string, data?:D): Observable<T> {
        return this.http.post<T>(`${this.api_url}${url}`, 
            JSON.stringify(data), {
                headers: this.headers
            }
        )
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
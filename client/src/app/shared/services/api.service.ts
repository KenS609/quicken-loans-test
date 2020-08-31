import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {

    constructor(
        private http: HttpClient
    ) { }


    post<T>(module: string, filter: { [key: string]: any } = {}) {
        return this.http.post<T>(`/${module}`, filter);
    }

}

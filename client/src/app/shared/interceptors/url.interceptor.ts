import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Check if request url starts with '/' then add serverEndpoint.
        const appendApiEndpoint = request.url.startsWith('/');
        if (appendApiEndpoint) {
            request = request.clone({
                url: `${environment.serverEndpoint}${request.url}`
            });
        }

        return next.handle(request);
    }
}

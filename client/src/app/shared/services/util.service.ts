import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UtilService {
    constructor(private snackBar: MatSnackBar) { }

    openSnackBar(message: string, duration = 2000, action: string = 'close') {
        this.snackBar.open(message, action, {
            duration,
        });
    }


    logData(message: string, data: any = '') {
        if (!environment.production) {
            console.log(`[QUicken Loans][${new Date().toString()}]  ${message} ${JSON.stringify((data || ''), null, 4)}`);
        }
    }
}

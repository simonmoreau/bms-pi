// Imports
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { Reading } from './models/reading.models';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { mergeMap } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { AccessToken } from './models/forge.model';

@Injectable()
export class AppService {

    // Resolve HTTP using the constructor
    constructor(private http: HttpClient) {

    }

    baseURl = 'https://bmspifunction.azurewebsites.net/api';

    getLastValue(sensorId): Observable<Reading> {
        return this.http.get<Reading>(
            this.baseURl + '/reccords/' + sensorId + '/lastvalue',
            {
                headers: new HttpHeaders()
                    .set('Content-Type', 'application/json')
            })
            .catch(this.handleError);
    }

    getPastValues(sensorId): Observable<Reading[]> {
        return this.http.get<Reading[]>(
            this.baseURl + '/reccords/' + sensorId + '/pastvalues',
            {
                headers: new HttpHeaders()
                    .set('Content-Type', 'application/json')
            })
            .catch(this.handleError);
    }

    getToken(): Observable<AccessToken> {
        return this.http.get<AccessToken>(
            this.baseURl + '/token',
            {
                headers: new HttpHeaders()
                    .set('Content-Type', 'application/json')
            })
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.log(errorMessage);
        return Observable.throw(errorMessage);
    }
}

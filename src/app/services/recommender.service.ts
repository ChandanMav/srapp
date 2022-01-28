import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, retry, Subject, throwError } from 'rxjs';
import { HealthParameter } from '../shared/healthp'

import {outputs} from '../shared/output'
import { GRPOutput } from '../shared/group.output.model';


const baseUrl = 'http://54.166.223.227/result';

@Injectable({
  providedIn: 'root'
})
export class RecommenderService {

  private data: HealthParameter;
  grpOutputs = new Subject<GRPOutput[]>();


  constructor(private http: HttpClient) { }

  public sportsPrediction(empdata: HealthParameter): Observable<any> {


    console.log(empdata);

    var formData = new FormData();
    formData.append("sportstype", empdata.sportstype);
    formData.append("bmi", empdata.bmi);
    formData.append("Running_Speed", empdata.Running_Speed);
    formData.append("agility", empdata.agility);
    formData.append("Reaction_Time", empdata.Reaction_Time);
    formData.append("balance", empdata.balance);
    formData.append("strength", empdata.strength);
    formData.append("aggression", empdata.aggression);
    formData.append("anticipation_index", empdata.anticipation_index);
    formData.append("peripheral_vision", empdata.peripheral_vision);

    // console.log(formData);

    // var observable = new Observable((observer: any) => {
    //   let index = Math.random() > 0.5 ? 1 : 0;
    //   setTimeout(() => observer.next(outputs[index]), 2000);
    // })

    // return observable;

    return this.http.post(baseUrl, formData)
    .pipe(
      retry(1),
      catchError((error) => this.handleError(error))
    );
  }


  handleError(erroResp: HttpErrorResponse): Observable<any> {
    console.log(erroResp);
    let errorMsg: string = 'An error occured. Please try after sometime!';

    return throwError(() => errorMsg);
  }


}

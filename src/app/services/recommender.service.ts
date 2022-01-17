import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HealthParameter } from '../shared/healthp'

import {outputs} from '../shared/output'


const baseUrl = 'http://54.166.223.227:5000/result';

@Injectable({
  providedIn: 'root'
})
export class RecommenderService {

  private data: HealthParameter;

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

    console.log(formData);

    var observable = new Observable((observer: any) => {
      let index = Math.random() > 0.5 ? 1 : 0;
      setTimeout(() => observer.next(outputs[index]), 2000);
    })

    return observable;

    //return this.http.post(baseUrl, formData);

  }


}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HealthParameter } from '../shared/healthp'


const baseUrl = 'http://54.166.223.227:5000/result';

@Injectable({
  providedIn: 'root'
})
export class RecommenderService {

  private data: HealthParameter;

  constructor(private http: HttpClient) { }

  public SaveEmployee(empdata: any): Observable<any> {

    delete empdata["name"];

    this.data = empdata;
    console.log(this.data);


    var observable = new Observable((observer:any) => {
        setTimeout(()=>  observer.next('Hey guys!') , 2000);
     })

     
    // return this.http.post(baseUrl, this.data, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': "*"
    //   }
    // });

    return observable;
  }


}

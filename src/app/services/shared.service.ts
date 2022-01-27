import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  messageSubject = new BehaviorSubject<boolean>(true);
  isGroupSubmit = new BehaviorSubject<boolean>(false);

  constructor() { }
}

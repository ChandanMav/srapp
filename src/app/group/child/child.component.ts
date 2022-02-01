import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { RecommenderService } from 'src/app/services/recommender.service';
import { SharedService } from 'src/app/services/shared.service';
import { GRPOutput } from 'src/app/shared/group.output.model';
import Swal from 'sweetalert2';
import { SPORT } from './../../shared/sports'
import { Quote } from './../../shared/sports'
import { Quotes } from './../../shared/sports'

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent implements OnInit, OnDestroy {
  @Input() data: any = {};
  @Input() i: number = 0;
  isChecked: boolean = true;
  @Output() checkedIn = new EventEmitter<{ i: number; action: string }>();
  @Output() checkedout = new EventEmitter<{ i: number; action: string }>();
  selectAllSubject: Subscription;
  isGroupSubmit: boolean;
  isResponseArrived: boolean;
  responseData: GRPOutput;
  isGroupSubmitSubject: Subscription;
  grpOutputsSubject: Subscription;
  sports: string[] = SPORT;
  quotes: Quote[] = Quotes

  checkboxClicked(i: number) {
    this.isChecked = !this.isChecked;

    if (this.isChecked) {
      this.checkedIn.emit({ i: this.i, action: 'include' });
    } else {
      this.checkedIn.emit({ i: this.i, action: 'exclude' });
    }
  }
  constructor(
    private commonService: SharedService,
    private recommenderService: RecommenderService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnDestroy(): void {
    this.commonService.isGroupSubmit.next(false);
    this.selectAllSubject.unsubscribe();
    this.isGroupSubmitSubject.unsubscribe();
    this.grpOutputsSubject.unsubscribe();
  }

  ngOnInit(): void {
    this.selectAllSubject = this.commonService.messageSubject.subscribe({
      next: (data) => (this.isChecked = data),
    });
    this.isGroupSubmitSubject = this.commonService.isGroupSubmit.subscribe({
      next: (data) => (this.isGroupSubmit = data),
    });

    this.grpOutputsSubject = this.recommenderService.grpOutputs.subscribe({
      next: (data) => {
        let isDataAvaiable = false;
        for (let d of data) {
          if (d.index == this.i) {
            isDataAvaiable = true;
            this.isGroupSubmit = false;
            //this.isChecked = false;
            this.responseData = d;
          }
        }
        this.isResponseArrived = isDataAvaiable;

      },
    });


  }

  getBtnClass(): string {
    return this.responseData.prediction === 'Recommended'
      ? 'btn btn-success recommended'
      : 'btn btn-warning not-recommended';
  }


  getFontAwesomeClass(): string {
    return this.responseData.prediction === 'Recommended'
      ? 'fa fa-check text-success'
      : 'fa fa-close text-danger';
  }

  getStyle(): any {
    return this.responseData.prediction === 'Recommended'
      ? {'font-size': '18px', 'margin-top': '5px', 'margin-left': '21px'}
      : {'font-size': '22px', 'margin-top': '5px', 'margin-left': '21px'}
  }


  tryIt(modelRef: any) {
    modelRef.click();
    this.commonService.isGroupSubmit.next(false);
    this.router.navigate(['/recommendation'], {
      relativeTo: this.activatedRoute,
      queryParams: this.data,
    });
  }

  save() {
    this.commonService.isGroupSubmit.next(false);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Data have been saved and can be found in the report section ',
      showConfirmButton: false,
      timer: 2000,
      width: '24rem',
    })
  }

  getNotRecommendedKeyCSS(key: string): string {
    return this.isKeyFound(key) ? "text-danger" : ""
  }

  isKeyFound(key: string): boolean {
    if (this.responseData.prediction === 'Not Recommended') {
      for (let k of this.responseData.imp_params_label) {
        if (k == key) {
          return true;
        }
      }
    }
    return false;
  }

  otherSportsRecommendation(i: number): string {
    let l = this.sports.length;

    if (i == 0) {
      i = l - 1
    }

    if (i >= l) {
      i = i % l
    }

    return this.sports[i];
  }

  getSportsImage(i: number): string {

   let sportName = this.otherSportsRecommendation(i);

   switch(sportName){
     case "Football" :{
          return "football"
     }
     case "Cricket" :{
       return "cricket"
    }
    case "Tennis" :{
       return "tennis"
    }
    case "BasketBall" :{
       return "basketball"
    }
   }
   return "football";
  }
}

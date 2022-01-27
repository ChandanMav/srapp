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
import { Subscription } from 'rxjs';
import { RecommenderService } from 'src/app/services/recommender.service';
import { SharedService } from 'src/app/services/shared.service';
import { GRPOutput } from 'src/app/shared/group.output.model';
import Swal from 'sweetalert2';

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
            this.isChecked = false;
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

  tryIt(modelRef: any) {
    modelRef.click();
    this.router.navigate(['/recommendation'], {
      relativeTo: this.activatedRoute,
      queryParams: this.data,
    });
  }

  save() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Data have been saved and can be found in the report section ',
      showConfirmButton: false,
      timer: 2000,
      width: '24rem',
    })
  }

  getNotRecommendedKeyCSS(key:string):string{
       return this.isKeyFound(key) ? "text-danger" : ""
  }

  isKeyFound(key: string):boolean {
    if (this.responseData.prediction === 'Not Recommended') {
       for(let k of this.responseData.imp_params_label){
          if(k == key){
            return true;
          }
       }
    }
    return false;
  }
}

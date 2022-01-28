import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecommenderService } from '../services/recommender.service';
import { SharedService } from '../services/shared.service';
import { Groups } from '../shared/group';
import { GRPOutput } from '../shared/group.output.model';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
})
export class GroupComponent implements OnInit, OnDestroy {
  message: string = '';
  filename: string;
  errorMessage: string;
  submittedDateCount:number = 0;

  groups: {
    name: string;
    bmi: number;
    Running_Speed: number;
    agility: number;
    Reaction_Time: number;
    balance: number;
    strength: number;
    aggression: number;
    anticipation_index: number;
    peripheral_vision: number;
  }[] = [];

  items: number[] = [];

  isSelectAll: boolean;
  isGroupSubmit: boolean;

  behaviourSubject: Subscription;
  isGroupSubmitSubject: Subscription;

  responses: GRPOutput[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: SharedService,
    private recommenderService: RecommenderService
  ) {}

  ngOnDestroy(): void {
    this.behaviourSubject.unsubscribe();
    this.isGroupSubmitSubject.unsubscribe();
  }

  ngOnInit(): void {
    this.behaviourSubject = this.commonService.messageSubject.subscribe({
      next: (data) => (this.isSelectAll = data),
    });

    this.isGroupSubmitSubject = this.commonService.isGroupSubmit.subscribe({
      next: (data) => (this.isGroupSubmit = data),
    });

    // this.recommenderService.grpOutputs.subscribe({
    //   next : data => this.response
    // })
  }

  groupSubmit() {
    this.submittedDateCount = this.items.length;
    this.isGroupSubmit = true;
    this.message = " ";
    this.commonService.isGroupSubmit.next(true);
    let i = 0;

    for (let p of this.items) {
      let item = this.groups[p];
      let data: any = {};
      data.name = item.name;
      data.sportstype = 'Football';
      data.bmi = item.bmi;
      data.Running_Speed = item.Running_Speed;
      data.agility = item.agility;
      data.Reaction_Time = item.Reaction_Time;
      data.balance = item.balance;
      data.strength = item.strength;
      data.aggression = item.aggression;
      data.anticipation_index = item.anticipation_index;
      data.peripheral_vision = item.peripheral_vision;

      this.recommenderService.sportsPrediction({ ...data }).subscribe({
        next: (res) => {
          const response: any = {};
          response.index = p;
          if (res['prediction'] === 'Not Recommended') {
            response.prediction = 'Not Recommended';
            response.imp_params = res['imp_params'];
            response.imp_params_label = res['imp_params_label'];
            this.responses.push(response);
          }
          if (res['prediction'] === 'Recommended') {
            response.prediction = 'Recommended';
            response.imp_params = [];
            response.imp_params_label = [];
            this.responses.push(response);
          }
          i++;
          // console.log('___________________________');
          // console.log(p);
          // console.log(response);
          // console.log('___________________________');
          this.recommenderService.grpOutputs.next(this.responses);
        },
      });
    }
    this.items = [];
  }
  /**
   * on file drop handler
   */
  onFileDropped(file: File) {
    this.prepareFilesList(file.name);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(event: any) {
    let fileName = event.target.files[0].name;
    if (fileName.endsWith('.xlsx')) {
      this.prepareFilesList(event.target.files[0].name);
    } else {
      this.errorMessage = 'Please select xlsx file only.';
      this.message = '';
      this.filename = '';
    }
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(filename: string) {
    this.errorMessage = '';
    this.message = 'Successfully uploaded';
    this.filename = filename;
    this.groups = Groups;
    this.pushAll();
  }

  pushAll() {
    for (let i = 0; i < this.groups.length; i++) {
      this.items.push(i);
    }
  }

  removeAll() {
    this.items = [];
  }

  wrongFileDropped(message: string) {
    this.errorMessage = message;
    this.message = '';
    this.filename = '';
  }

  css(): string {
    return this.errorMessage === '' ? 'file-success' : 'file-error';
  }

  tryIt() {}

  cancel() {
    this.errorMessage = '';
    this.message = '';
  }

  onClick(a: { i: number; action: string }) {
    if (a.action === 'include') {
      if (!this.items.includes(a.i)) {
        this.items.push(a.i);
        this.isSelectAll = true;
      }
    }

    if (a.action === 'exclude') {
      if (this.items.includes(a.i)) {
        this.items = this.items.filter((item) => item !== a.i);
      }
    }
    if (this.items.length == 0) {
      this.commonService.messageSubject.next(false);
    } else {
    }
    this.display();
  }

  getClass(): string {
    return this.isSelectAll ? 'fa fa-check-square-o' : 'fa fa-square-o';
  }
  switchAll() {
    this.isSelectAll = !this.isSelectAll;
    if (this.isSelectAll) {
      this.pushAll();
      this.commonService.messageSubject.next(true);
    } else {
      this.removeAll();
      this.commonService.messageSubject.next(false);
    }
    this.display();
  }

  display() {
    // console.log(this.items)
  }

  exit() {
    this.commonService.isGroupSubmit.next(false);
    this.errorMessage = '';
    this.message = '';
    this.filename = '';
    this.items = [];
    this.isGroupSubmit = false;
    this.responses = [];
  }
}

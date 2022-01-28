import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RecommenderService } from '../services/recommender.service';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HealthParameter } from '../shared/healthp';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2';
import { Fireworks } from 'fireworks-js';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-health-parameter-input-form',
  templateUrl: './health-parameter-input-form.component.html',
  styleUrls: ['./health-parameter-input-form.component.css'],
})
export class HealthParameterInputFormComponent
  implements OnInit, AfterViewInit, OnDestroy {
  public frmRegister: FormGroup;
  submitted = false;
  isFormError: boolean;
  formInitialValues: any;
  queryParamSubscription: Subscription;
  errorMessage:string="";

  @ViewChild('inputForm') inputForm: ElementRef;

  container: any;
  fireworks: Fireworks;

  constructor(
    private recommenderService: RecommenderService,
    private _fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.frmRegister = this._fb.group({
      name: ['', [Validators.required]],
      sportstype: ['Football', [Validators.required]],
      bmi: ['', [Validators.required, Validators.min(1), Validators.max(99)]],
      Running_Speed: [
        '',
        [Validators.required, Validators.min(1), Validators.max(99)],
      ],
      agility: [
        '',
        [Validators.required, Validators.min(1), Validators.max(99)],
      ],
      Reaction_Time: [
        '',
        [Validators.required, Validators.min(1), Validators.max(99)],
      ],
      balance: [
        '',
        [Validators.required, Validators.min(1), Validators.max(99)],
      ],
      strength: [
        '',
        [Validators.required, Validators.min(1), Validators.max(99)],
      ],
      aggression: [
        '',
        [Validators.required, Validators.min(1), Validators.max(99)],
      ],
      anticipation_index: [
        '',
        [Validators.required, Validators.min(1), Validators.max(99)],
      ],
      peripheral_vision: [
        '',
        [Validators.required, Validators.min(1), Validators.max(99)],
      ],
    });

    this.formInitialValues = this.frmRegister.value;
    //this.formInitialValuesOriginal = this.frmRegister.value;

    // console.log(this.formInitialValues);

    this.queryParamSubscription = this.activatedRoute.queryParams.subscribe({
      next: (queryParams) => {
        if (Object.keys(queryParams).length != 0) {
          this.frmRegister.reset(queryParams);
        }
      },
    });
  }

  //convenience getter for easy access to form fields
  get f(): { [key: string]: AbstractControl } {
    return this.frmRegister.controls;
  }

  ngAfterViewInit() {
    // this.container = document.getElementById('inputForm');

    //this.inputForm.nativeElement
    this.fireworks = new Fireworks(this.inputForm.nativeElement, {
      rocketsPoint: 50,
      acceleration: 1.05,
      friction: 0.95,
      gravity: 1.5,
      particles: 50,
      trace: 3,
      explosion: 5,
      autoresize: true,
      brightness: {
        min: 50,
        max: 80,
        decay: { min: 0.015, max: 0.03 },
      },
    });
  }

  clear() {
    this.frmRegister.reset(this.formInitialValues);
    this.submitted = false;
  }

  ngOnDestroy(): void {
    this.queryParamSubscription.unsubscribe();
  }

  sportsPrediction(value: HealthParameter) {
    //console.log(this.frmRegister);
    this.submitted = true;

    if (this.frmRegister.invalid) {
      return;
    }

    this.recommenderService.sportsPrediction({ ...value }).subscribe({
      next: (res) => {
        this.submitted = false;
        this.errorMessage = '';
        if (res['prediction'] === 'Not Recommended') {
          let html =
            "<div class='row container'><div class='offset-3 col-9 pt-4'><table><tr><td>";
          let label = res['imp_params_label'];
          let value = res['imp_params'];

          for (let i = 0; i < label.length; i++) {
            if (i == label.length - 1) {
              html +=
                label[i].toUpperCase() +
                '</td> <td class="text-danger">' +
                value[i] +
                '</td></tr>';
            } else {
              html +=
                label[i].toUpperCase() +
                '</td> <td class="text-danger">' +
                value[i] +
                '</td></tr><tr><td>';
            }
          }

          html += '</div></div>';

          Swal.fire({
            icon: 'info',
            title:
              'Hello <span class="text-capitalize">' +
              this.frmRegister.value.name +
              '</span>',
            html:
              '<p class="fw-bolder fs-6">' +
              this.frmRegister.value.sportstype +
              ' is far but not too much...work on below parameters and re-take the assessment</p>' +
              html,
            width: '34rem',
            confirmButtonText: 'New Assessment',
            padding: '1em',
          });
        } else {
          this.fireworks.start();

          Swal.fire({
            title:
              'Good Job! <span class="text-capitalize">' +
              this.frmRegister.value.name +
              '</span>',
            text:
              'It’s time to get into ' + value.sportstype + ' training pitch.',
            icon: 'success',
            showClass: {
              popup: 'animate__animated  animate__zoomIn',
            },
            hideClass: {
              popup: 'animate__animated animate__zoomOut',
            },
            position: 'top',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'New Assessment',
            backdrop: `
            rgba(67, 239, 19, 0.1)
              url('../assets/fireworks-deepavali.gif')
              center center
              no-repeat
            `,
          });
        }
        this.clear();
      },
      error: (e) => {
        console.error(e);
        this.submitted = false;
        this.errorMessage = e;
        this.clear();
      },
    });
  }
}

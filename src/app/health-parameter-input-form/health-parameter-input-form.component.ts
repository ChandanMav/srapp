import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RecommenderService } from '../services/recommender.service';

import { FormBuilder, FormGroup } from '@angular/forms';
import { HealthParameter } from '../shared/healthp';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
import { Fireworks } from 'fireworks-js'

@Component({
  selector: 'app-health-parameter-input-form',
  templateUrl: './health-parameter-input-form.component.html',
  styleUrls: ['./health-parameter-input-form.component.css']
})
export class HealthParameterInputFormComponent implements OnInit, AfterViewInit {
  public frmRegister: FormGroup;
  submitted = false;


  @ViewChild('inputForm') inputForm: ElementRef;

  container: any
  fireworks: Fireworks;

  constructor(private recommenderService: RecommenderService, private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.frmRegister = this._fb.group({
      name: "",
      sportstype: "Football",
      bmi: "",
      Running_Speed: "",
      agility: "",
      Reaction_Time: "",
      balance: "",
      strength: "",
      aggression: "",
      anticipation_index: "",
      peripheral_vision: "",
    });


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
        decay: { min: 0.015, max: 0.03 }
      }
    })
  }

  sportsPrediction(value: HealthParameter) {
    console.log(this.frmRegister);
    this.submitted = true;
    this.recommenderService.sportsPrediction({ ...value }).subscribe({
      next: (res) => {

        this.submitted = false;

        if (res['prediction'] === 'Not Recommended') {
          let html = "<div class='row container'><div class='offset-4 col-8 pt-4'><table><tr><td>"
          let label = res['imp_params_label'];
          let value = res['imp_params'];

          for (let i = 0; i < label.length; i++) {
            if (i == label.length - 1) {
              html += label[i].toUpperCase() + '</td> <td class="text-danger">' + value[i] + '</td></tr>';
            } else {
              html += label[i].toUpperCase() + '</td> <td class="text-danger">' + value[i] + '</td></tr><tr><td>';
            }
          }

          html += "</div></div>"

          Swal.fire({
            icon: 'info',
            title: 'Hello ' + this.frmRegister.value.name,
            html: '<p class="display-6"><strong>' + this.frmRegister.value.sportstype + '</strong> is not recommended to you! </p>' +
              '<p class="mt-1">Due to following parameters  </p>' +
              html,
            width: '36rem',

            confirmButtonText:
              '<i class="fa fa-thumbs-up"></i> Great!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText:
              '<i class="fa fa-thumbs-down"></i>',
            cancelButtonAriaLabel: 'Thumbs down',
            padding: '1em',
            footer: '<a routerLink="/recommendation">Please checkout for other sports!</a>'

          })

        } else {


          this.fireworks.start()

          Swal.fire({
            title: 'Good job! ' + this.frmRegister.value.name,
            text: 'You have been recommended for the Sport ' + value.sportstype,
            icon: 'success',
            footer: 'Matched Criterai ' + res['probablity'] * 100 + "%",
            showClass: {
              popup: 'animate__animated  animate__zoomIn'
            },
            hideClass: {
              popup: 'animate__animated animate__zoomOut'
            },
            position: "top",
            backdrop: `
              rgba(0,255,0,0.01)
              url('../assets/fireworks-deepavali.gif')
              center center
              no-repeat              

            `
          }
          )
        }


      },
      error: (e) => console.error(e)
    });
  }
}

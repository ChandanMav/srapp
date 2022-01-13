import { Component, OnInit } from '@angular/core';
import { RecommenderService } from '../services/recommender.service';

import { FormBuilder, FormGroup } from '@angular/forms';
import { HealthParameter } from '../shared/healthp';


@Component({
  selector: 'app-health-parameter-input-form',
  templateUrl: './health-parameter-input-form.component.html',
  styleUrls: ['./health-parameter-input-form.component.css']
})
export class HealthParameterInputFormComponent implements OnInit {
  public frmRegister: FormGroup;
  submitted = false;

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

  SaveEmployee(value: HealthParameter) {
    this.recommenderService.SaveEmployee(value).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/shared/profile';
import { Profiles } from 'src/app/shared/profiles';

@Component({
  selector: 'app-user-profiles',
  templateUrl: './user-profiles.component.html',
  styleUrls: ['./user-profiles.component.css'],
})
export class UserProfilesComponent implements OnInit {
  user_profiles: Profile[] = [];
  isFilterSelected:boolean = false;
  rowNum: string = "col-12";
  constructor() {}

  ngOnInit(): void {
    this.user_profiles = Profiles;
  }

  showFilter(){
    this.isFilterSelected = !this.isFilterSelected;
    if(this.isFilterSelected){
      this.rowNum="col-10";
    }else{
      this.rowNum="col-12";
    }
  }
}

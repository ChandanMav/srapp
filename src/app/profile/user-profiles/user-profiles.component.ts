import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';
import { Profile } from 'src/app/shared/profile';
import { Profiles } from 'src/app/shared/profiles';

@Component({
  selector: 'app-user-profiles',
  templateUrl: './user-profiles.component.html',
  styleUrls: ['./user-profiles.component.css'],
})
export class UserProfilesComponent implements OnInit, OnDestroy {
  user_profiles: Profile[] = [];
  isFilterSelected: boolean;
  rowNum: string = "col-12";
  filterSubscription:Subscription

  constructor(private sharedService: SharedService) { }


  ngOnInit(): void {
    this.user_profiles = Profiles;
    this.filterSubscription =  this.sharedService.filterEnabled.subscribe({
      next: enableFlag => { this.isFilterSelected = enableFlag; this.setRowNum(); }
    })
  }

  showFilter() {
    this.isFilterSelected = !this.isFilterSelected;
    this.sharedService.filterEnabled.next(this.isFilterSelected);
    this.setRowNum();
  }

  private setRowNum() {
    if (this.isFilterSelected) {
      this.rowNum = "col-10";
    } else {
      this.rowNum = "col-12";
    }
  }

  ngOnDestroy(): void {
    this.filterSubscription.unsubscribe();
  }


}

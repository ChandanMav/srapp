import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/shared/profile';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit, AfterViewInit {
  @Input('profile')
  user_profile: Profile = new Profile();

  @Input()
  i: number = 0;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}

  getClass(): string {
    return this.user_profile.result === 'Recommended' ? 'bg-rcmd' : 'bg-nrcmd';
  }

  ngAfterViewInit() {
    const arr: string[] = this.user_profile.parameters;
    if (arr.length != 0) {
      for (let element of arr) {
        var el: any = document.getElementById(element + this.i);
        if (el !== null) {
          el.style.fontWeight = 'bold';
          el.style.color = 'red';
        }
      }
    }
  }

  tryIt() {
    this.router.navigate(['/recommendation'], {
      relativeTo: this.activatedRoute,
      queryParams: this.user_profile,
    });
  }
}

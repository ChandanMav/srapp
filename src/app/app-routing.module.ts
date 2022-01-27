import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { GroupComponent } from './group/group.component';
import { HealthParameterInputFormComponent } from './health-parameter-input-form/health-parameter-input-form.component';
import { HomeComponent } from './home/home.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { RecommendEngineHomeComponent } from './recommend-engine-home/recommend-engine-home.component';
import { UserProfileComponent } from './profile/user-profiles/user-profile/user-profile.component';
import { UserProfilesComponent } from './profile/user-profiles/user-profiles.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'recommendation',
    component: RecommendEngineHomeComponent,
    children: [
      {
        path: '',
        component: HealthParameterInputFormComponent

      },
      {
        path: 'group',
        component: GroupComponent,
      },
      {
        path: 'prescription',
        component: PrescriptionComponent,
      },
      {
        path: 'profile',
        component: UserProfilesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

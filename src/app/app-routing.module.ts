import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './home/home.component';
import { RecommendEngineHomeComponent } from './recommend-engine-home/recommend-engine-home.component';

const routes: Routes = [
  { path:"", component: HomeComponent },
  { path:"recommendation", component:  RecommendEngineHomeComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

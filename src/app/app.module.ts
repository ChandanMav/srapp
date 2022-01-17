import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { BottomContentComponent } from './bottom-content/bottom-content.component';
import { HealthParameterInputFormComponent } from './health-parameter-input-form/health-parameter-input-form.component';
import { BannerComponent } from './banner/banner.component';

import { RecommenderService } from './services/recommender.service';
import { RecommendEngineHomeComponent } from './recommend-engine-home/recommend-engine-home.component';
import { HomeComponent } from './home/home.component';

import { NgwWowModule } from 'ngx-wow';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ContentComponent,
    BottomContentComponent,
    HealthParameterInputFormComponent,
    BannerComponent,
    RecommendEngineHomeComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgwWowModule
  ],
  providers: [RecommenderService],
  bootstrap: [AppComponent]
})
export class AppModule { }

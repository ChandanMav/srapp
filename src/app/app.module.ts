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


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ContentComponent,
    BottomContentComponent,
    HealthParameterInputFormComponent,
    BannerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [RecommenderService],
  bootstrap: [AppComponent]
})
export class AppModule { }

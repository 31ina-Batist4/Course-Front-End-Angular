import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule,
         MatSlideToggleModule,
         MatFormFieldModule,
         MatSelectModule,
         MatSliderModule,
         MatCheckboxModule,
         MatInputModule,
         MatDialogModule,
         MatButtonModule,
         MatCardModule,
         MatGridListModule,
         MatListModule,
         MatToolbarModule  } from '@angular/material';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import 'hammerjs';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';

import { baseURL } from './shared/baseurl';

import { DishService  } from './services/dish.service';
import { PromotionService  } from './services/promotion.service';
import { LeaderService  } from './services/leader.service';
import { FeaturedService } from './services/featured.service';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';
import { FeedbackService } from './services/feedback.service';
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule ,
    MatCheckboxModule,
    MatSelectModule,
    MatSlideToggleModule ,
    MatGridListModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    AppRoutingModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule
  ],
   
    providers: [ 
      DishService,
      PromotionService,
      LeaderService,
      FeedbackService,
      FeaturedService,
      ProcessHTTPMsgService,
      { provide: 'BaseURL', useValue: baseURL}
    ],
    entryComponents: [
      LoginComponent
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }

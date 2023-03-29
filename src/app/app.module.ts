import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './core/footer/footer.component';
import {HeaderComponent} from './core/header/header.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {PageNotFoundComponent} from './modules/error-pages/page-not-found/page-not-found.component';
import { ApiInterceptor } from './core/services/api-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

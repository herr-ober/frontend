import {SharedModule} from './shared/shared.module';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PageNotFoundComponent} from './modules/error-pages/page-not-found/page-not-found.component';
import {ApiInterceptor} from './core/interceptors/api-interceptor.service';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        SharedModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
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

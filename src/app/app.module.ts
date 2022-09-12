import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './components/form/form.component';
import { StockListComponent } from './components/stock-list/stock-list.component';
import { LoadingComponent } from './components/loading/loading.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { QuoteCardComponent } from './components/quote-card/quote-card.component';
import { SentimentComponent } from './components/sentiment/sentiment.component';
import { MonthTranslatePipe } from './pipes/month-translate.pipe';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        FormComponent,
        StockListComponent,
        LoadingComponent,
        QuoteCardComponent,
        SentimentComponent,
        MonthTranslatePipe
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        FontAwesomeModule,
        HttpClientModule,
        ToastrModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

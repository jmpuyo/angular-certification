import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { SentimentComponent } from './components/sentiment/sentiment.component';

const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'sentiment/:symbol', component: SentimentComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

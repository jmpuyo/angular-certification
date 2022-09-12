import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SymbolQueryModel } from '../../models/symbol-query.model';
import { Location } from '@angular/common';
import { SentimentModel } from '../../models/sentiment.model';
import { FinnhubService } from '../../services/finnhub.service';
import { take } from 'rxjs/operators';
import { faArrowUp, faArrowDown, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-sentiment',
    templateUrl: './sentiment.component.html',
    styleUrls: ['./sentiment.component.scss']
})
export class SentimentComponent implements OnInit {

    private symbol: string;

    faArrowUp: IconDefinition = faArrowUp;
    faArrowDown: IconDefinition = faArrowDown;

    stock: SymbolQueryModel;
    isLoading: boolean = false;
    sentiment: SentimentModel[] = new Array<SentimentModel>();

    constructor(
        private lsService: LocalStorageService,
        private activatedRoute: ActivatedRoute,
        private location: Location,
        private fhService: FinnhubService,
        private toastr: ToastrService
    ) {
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.activatedRoute.params.subscribe((s: Params) => {
            this.symbol = s["symbol"]
            if(this.symbol == null || this.symbol.trim().length == 0) {
                this.location.back();
            } else {
                this.stock = this.lsService.getSymbol(this.symbol);
                this.fhService.getSentiment(this.symbol)
                    .pipe(take(1))
                    .subscribe((s: SentimentModel[]) => {
                        this.sentiment = s;
                    }, (err) => {
                        this.toastr.error('An error occurred while loading information')
                    }, () => this.isLoading = false);
            }
        });
    }

}

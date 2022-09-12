import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Subscription } from 'rxjs';
import { SymbolQueryModel } from '../../models/symbol-query.model';
import { take, tap } from 'rxjs/operators';
import { FinnhubService } from '../../services/finnhub.service';
import { QuoteModel } from '../../models/quote.model';

@Component({
    selector: 'app-stock-list',
    templateUrl: './stock-list.component.html',
    styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit, OnDestroy {

    isLoading: boolean = false;
    quotes: SymbolQueryModel[];

    lsSub: Subscription = new Subscription();

    constructor(
        private lsService: LocalStorageService,
        private fhService: FinnhubService
    ) {
    }

    ngOnInit(): void {
        this.lsSub = this.lsService.symbols
            .pipe(
                tap((list: SymbolQueryModel[]) => list.length > 0 ? this.isLoading = true : this.isLoading = false)
            )
            .subscribe((list: SymbolQueryModel[]) => {
                this.quotes = [...list];
                this.quotes.forEach((item: SymbolQueryModel, idx: number) => {
                    this.fhService.getQuote(item.symbol)
                        .pipe(take(1))
                        .subscribe((value: QuoteModel) => {
                            item.quote = value;
                        }, (error) => console.log(error), () => {
                            if (idx + 1 == list.length) {
                                this.isLoading = false;
                            }
                        });
                });
            });
    }

    ngOnDestroy(): void {
        this.lsSub.unsubscribe();
    }

}

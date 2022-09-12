import { Component, OnInit, Input } from '@angular/core';
import { SymbolQueryModel } from '../../models/symbol-query.model';
import { faArrowUp, faArrowDown, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
    selector: 'app-quote-card',
    templateUrl: './quote-card.component.html',
    styleUrls: ['./quote-card.component.scss']
})
export class QuoteCardComponent implements OnInit {

    faArrowUp: IconDefinition = faArrowUp;
    faArrowDown: IconDefinition = faArrowDown;

    @Input() quotes: SymbolQueryModel[];

    constructor(private lsService: LocalStorageService) {
    }

    ngOnInit(): void {
    }

    public remove(symbol: SymbolQueryModel) {
        this.lsService.removeSymbol(symbol);
    }
}

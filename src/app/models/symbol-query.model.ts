import { QuoteModel } from './quote.model';

export class SymbolQueryModel {
    public quote: QuoteModel;

    constructor(
        public description: string,
        public displaySymbol: string,
        public symbol: string,
        public type: string
    ) {}

    public static fromJson(json: Object): SymbolQueryModel {
        return new SymbolQueryModel(
            json['description'],
            json['displaySymbol'],
            json['symbol'],
            json['type']
        );
    }
}

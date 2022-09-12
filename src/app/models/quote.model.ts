export class QuoteModel {
    constructor(
        public currentPrice: number,
        public change: number,
        public percentChange: number,
        public highPriceDay: number,
        public lowPriceDay: number,
        public openPriceDay: number,
        public previousClosePrice: number
    ) {
    }

    public static fromJson(json: Object): QuoteModel {
        return new QuoteModel(
            json['c'],
            json['d'],
            json['dp'],
            json['h'],
            json['l'],
            json['o'],
            json['pc']
        );
    }
}

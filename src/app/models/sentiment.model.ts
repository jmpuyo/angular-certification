export class SentimentModel {
    constructor(
        public change: number,
        public month: number,
        public mspr: number,
        public symbol: string,
        public year: number
    ) {
    }

    public static fromJson(json: Object): SentimentModel {
        return new SentimentModel(
            json['change'],
            json['month'],
            json['mspr'],
            json['symbol'],
            json['year']
        );
    }
}

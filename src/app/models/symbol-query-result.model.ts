import { SymbolQueryModel } from './symbol-query.model';

export class SymbolQueryResultModel {
    constructor(
        public count: number,
        public result: SymbolQueryModel[]
    ) {}

    public static fromJson(json: Object): SymbolQueryResultModel {
        let resultArr: SymbolQueryModel[] = new Array<SymbolQueryModel>();
        json['result'].forEach( val => {
            resultArr.push(SymbolQueryModel.fromJson(val));
        });
        return new SymbolQueryResultModel(
            json['count'],
            resultArr
        );
    }
}

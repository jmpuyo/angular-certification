import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SymbolQueryModel } from '../models/symbol-query.model';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    symbols = new BehaviorSubject(this.stockList);

    constructor() {
    }

    set stockList(list: SymbolQueryModel[]) {
        console.log('StockList: ', list);
        this.symbols.next(list);
        localStorage.setItem('stockList', JSON.stringify(list));
    }

    get stockList(): SymbolQueryModel[] {
        let list: SymbolQueryModel[] = new Array<SymbolQueryModel>();
        JSON.parse(localStorage.getItem('stockList'))?.forEach(val => {
            list.push(SymbolQueryModel.fromJson(val));
        });
        return list;
    }

    public addSymbol(symbol: SymbolQueryModel): void {
        let found: boolean = false;

        this.stockList.forEach((val: SymbolQueryModel) => {
            if (val.symbol == symbol.symbol) {
                found = true;
            }
        });

        if (!found) {
            this.stockList = [...this.stockList, symbol];
        }
    }

    public removeSymbol(symbol: SymbolQueryModel): void {
        let newList: SymbolQueryModel[] = new Array<SymbolQueryModel>();
        this.stockList.forEach((val: SymbolQueryModel) => {
            if (val.symbol != symbol.symbol) {
                newList.push(val);
            }
        });

        this.stockList = newList;
    }

    public getSymbol(symbol: string): SymbolQueryModel {
        let retSymbol: SymbolQueryModel;
        this.stockList.forEach((val: SymbolQueryModel) => {
            if (val.symbol == symbol) {
                retSymbol = val;
            }
        });

        return retSymbol;
    }

}

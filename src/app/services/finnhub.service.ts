import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SymbolQueryResultModel } from '../models/symbol-query-result.model';
import { map, tap } from 'rxjs/operators';
import { QuoteModel } from '../models/quote.model';
import { SentimentModel } from '../models/sentiment.model';
import { formatDate } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class FinnhubService {

    private apiUrl: string;
    private apiKey: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl;
        this.apiKey = environment.apiToken;
    }

    public getSymbol(searchTerm: string): Observable<SymbolQueryResultModel> {
        return this.http.get<SymbolQueryResultModel>(
            this.apiUrl + '/search', {
                params: {
                    q: searchTerm,
                    token: this.apiKey
                }
            })
            .pipe(
                map(data => SymbolQueryResultModel.fromJson(data))
            );
    }

    public getQuote(symbol: string): Observable<QuoteModel> {
        return this.http.get<QuoteModel>(
            this.apiUrl + '/quote', {
                params: {
                    symbol: symbol,
                    token: this.apiKey
                }
            })
            .pipe(
                map(data => QuoteModel.fromJson(data))
            );
    }

    public getSentiment(symbol: string): Observable<SentimentModel[]> {
        let d: Date = new Date();
        let endDate: string = formatDate(d,'yyyy-MM-dd', 'en');
        d.setMonth(d.getMonth() - 2);
        let startDate: string = formatDate(d,'yyyy-MM-dd', 'en');

        return this.http.get<any>(
            this.apiUrl + '/stock/insider-sentiment', {
                params: {
                    symbol: symbol,
                    from: startDate,
                    to: endDate,
                    token: this.apiKey
                }
            })
            .pipe(
                map((data: any) => {
                    let mapped: SentimentModel[] = new Array<SentimentModel>();
                    if (data && data.data) {
                        data.data.forEach(val => {
                            mapped.push(SentimentModel.fromJson(val));
                        })
                    }
                    return mapped;
                })
            );
    }
}

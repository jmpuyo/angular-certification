import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FinnhubService } from '../../services/finnhub.service';
import { Subscription } from 'rxjs';
import { SymbolQueryResultModel } from '../../models/symbol-query-result.model';
import { faSpinner, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SymbolQueryModel } from '../../models/symbol-query.model';
import { LocalStorageService } from '../../services/local-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

    stockTrackForm: FormGroup;
    submitted: boolean = false;
    isLoading: boolean = false;
    faSpinner: IconDefinition = faSpinner;

    private searchSub: Subscription = new Subscription();

    constructor(
        private fb: FormBuilder,
        private fs: FinnhubService,
        private lsService: LocalStorageService,
        private toastr: ToastrService) {
    }

    ngOnInit(): void {
        this._buildForm();
    }

    onSubmit(): void {
        this.submitted = true;
        if (this.stockTrackForm.valid) {
            this.isLoading = true;
            let code = this.stockTrackForm.get('stockCode').value;
            this.searchSub = this.fs.getSymbol(code)
                .subscribe((res: SymbolQueryResultModel) => {
                    if(res.count > 0) {
                        let found: boolean = false;

                        res.result.forEach((val: SymbolQueryModel) => {
                            if(val.symbol == code && !found) {
                                this.lsService.addSymbol(val);
                                found = true;
                            }
                        })

                        if(!found) {
                            this.toastr.warning('The symbol does not exist');
                        }
                    } else {
                        this.toastr.warning('The symbol does not exist');
                    }
                }, (err) => {
                    this.toastr.error('There was an error with api call');
                    this.isLoading = false
                }, () => this.isLoading = false);
        }
    }

    private _buildForm(): void {
        this.stockTrackForm = this.fb.group({
            stockCode: new FormControl('', {
                validators: [Validators.required, Validators.maxLength(5)],
                updateOn: 'blur'
            })
        }, { updateOn: 'submit' });
    }

}

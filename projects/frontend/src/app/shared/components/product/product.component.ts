import { Component, Input, OnInit } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';

import { Product } from 'src/models/Product';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    @Input() product: Product;

    public color = 'tw-bg-orange-600';
    public isAuthenticated$: Observable<boolean>; 

    constructor(
        private authService: NbAuthService
    ) { }

    ngOnInit(): void {
        const items = ['tw-bg-orange-600', 'tw-bg-green-600', 'tw-bg-purple-600'];

        this.color = items[Math.floor(Math.random() * items.length)];
        this.isAuthenticated$ = this.authService.onAuthenticationChange();
    }

}

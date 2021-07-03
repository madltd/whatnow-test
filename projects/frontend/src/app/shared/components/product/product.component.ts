import { Component, Input, OnInit } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';

import { Product } from 'src/models/Product';
import { CartService } from 'src/services/cart.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    @Input() product: Product & { qty?: number };

    public color = 'tw-bg-orange-600';
    public isAuthenticated$: Observable<boolean>; 

    constructor(
        private authService: NbAuthService,
        private cartService: CartService
    ) { }

    ngOnInit(): void {
        const items = ['tw-bg-orange-600', 'tw-bg-green-600', 'tw-bg-purple-600'];

        this.color = items[Math.floor(Math.random() * items.length)];
        this.isAuthenticated$ = this.authService.onAuthenticationChange();
    }

    public change(qty = 1): void {
        this.cartService.changeCart(this.product, qty);
    }
}

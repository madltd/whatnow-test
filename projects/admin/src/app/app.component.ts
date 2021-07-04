import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { tap, map, first } from 'rxjs/operators';

import { Product } from 'src/models/Product';
import { CartService } from 'src/services/cart.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public isAuthenticated$: Observable<boolean>;

    constructor(
        private authService: NbAuthService,
        private auth: AngularFireAuth,
        private cartService: CartService
    ) { }

    ngOnInit() {
        this.isAuthenticated$ = this.auth.authState.pipe(
            tap(user => {
                if (!user) this.cartService.destroy();
                else this.cartService.initAdmin();
            }),
            map(user => !!user)
        );
    }

    public get carts() {
        return this.cartService.carts;
    }

    public change(cart: any, product: Product, qty: number) {
        this.cartService.changeCart(product, qty, cart);
    }

    public deleteCart(cart: any) {
        this.cartService.deleteCart(cart.userId);
    }

    public login() {
        this.authService.authenticate('google').pipe(first()).subscribe();
    }

    public logout() {
        this.authService.logout('google').pipe(first()).subscribe();
    }
}

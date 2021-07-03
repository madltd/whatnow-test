import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NbAuthService } from '@nebular/auth';
import { NbSidebarService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';

import { Cart } from 'src/models/Cart';
import { CartService } from 'src/services/cart.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public sideBarState = 'expanded';
    public isAuthenticated$: Observable<boolean>;

    constructor(
        private sidebarService: NbSidebarService,
        private authService: NbAuthService,
        private auth: AngularFireAuth,
        private cartService: CartService
    ) { }

    ngOnInit() {
        this.isAuthenticated$ = this.auth.authState.pipe(
            tap(user => {
                if (!user) {
                    this.sidebarService.collapse();
                    this.cartService.destroy();
                } else {
                    this.cartService.init(user.uid);
                }
            }),
            map(user => !!user)
        );
    }

    public get cart() {
        return this.cartService.cart;
    }

    public get cartTotal() {
        return this.cartService.total;
    }

    public toggle(): void {
        this.sidebarService.toggle();
    }

    public login() {
        this.authService.authenticate('google').pipe(first()).subscribe();
    }

    public logout() {
        this.authService.logout('google').pipe(first()).subscribe();
    }
}

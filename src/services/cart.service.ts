import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { cloneDeep, round } from 'lodash';
import { combineLatest, of, Subscription } from 'rxjs';
import { filter, switchMap, map } from 'rxjs/operators';

import { Cart } from 'src/models/Cart';
import { Product } from 'src/models/Product';

@Injectable({
    providedIn: 'root'
})
export class CartService implements OnDestroy {
    public cart: Array<Product & { qty: number }> = [];
    public total = 0;

    private userId: string;
    private cartSub: Subscription;

    constructor(
        private firestore: AngularFirestore,
    ) { }

    ngOnDestroy() {
        this.cartSub?.unsubscribe();
    }

    public changeCart(product: Product, qty = 1) {
        const products = cloneDeep(this.cart);

        const index = products.findIndex(val => val.sku === product.sku);

        if (index === -1) products.push({ ...product, qty });
        else products[index].qty += qty;

        this.saveCart(products);
    };

    public init(userId: string) {
        if (this.userId === userId) return;

        this.cartSub?.unsubscribe();

        this.userId = userId;

        this.cartSub = this.firestore.doc<Cart>(`carts/${userId}`).valueChanges().pipe(
            filter(cart => !!cart),
            switchMap(cart => {
                if (!cart.items?.length) return of([]);

                return combineLatest(cart.items.map(val => {
                    return this.firestore.doc<Product>(`products/${val.productId}`).get().pipe(
                        map(item => ({ ...item.data(), uid: item.id, qty: val.qty }))
                    )
                }))
            }),
        ).subscribe(cart => {
            this.cart = cart;

            this.total = round(this.cart.reduce((acc, item) => acc + item.price * item.qty, 0), 2);
        });
    }

    public destroy() {
        this.userId = null;
        this.cart = [];
        this.total = 0;

        this.cartSub?.unsubscribe();
    }

    private saveCart(products: Array<Product & { qty: number }>): void {
        const cart: Cart = {
            userId: this.userId,
            items: products.filter(val => val.qty).map(val => ({ productId: val.uid, qty: val.qty }))
        };

        this.firestore.doc(`carts/${this.userId}`).set(cart).catch(() => 0);
    }
}

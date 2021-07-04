import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { cloneDeep, round, uniq } from 'lodash';
import { combineLatest, of, Subscription } from 'rxjs';
import { filter, switchMap, map } from 'rxjs/operators';

import { Cart } from 'src/models/Cart';
import { Product } from 'src/models/Product';

type AdminCart = { userId: string; items: Array<Product & { qty: number; }> };

@Injectable({
    providedIn: 'root'
})
export class CartService implements OnDestroy {
    public cart: Array<Product & { qty: number; }> = [];
    public carts: AdminCart[] = [];
    public total = 0;

    private userId: string;
    private cartSub: Subscription;

    constructor(
        private firestore: AngularFirestore,
    ) { }

    ngOnDestroy() {
        this.cartSub?.unsubscribe();
    }

    public changeCart(product: Product, qty = 1, cart?: AdminCart) {
        const products = cloneDeep(cart?.items || this.cart);

        const index = products.findIndex(val => val.sku === product.sku);

        if (index === -1) products.push({ ...product, qty });
        else products[index].qty += qty;

        this.saveCart(products, cart?.userId);
    };

    public deleteCart(uid: string) {
        this.firestore.doc(`carts/${uid}`).delete().catch(() => 0);
    }

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

    public initAdmin() {
        this.cartSub?.unsubscribe();

        this.cartSub = this.firestore.collection<Cart>('carts').valueChanges().pipe(
            switchMap(carts => {
                if (!carts.length) return of([]);

                const ids = uniq(carts.reduce((acc, item) => ([ ...acc, ...item.items.map(val => val.productId) ]), []));

                if (!ids.length) return of([]);

                return combineLatest([
                    of(carts),
                    ...ids.map(val => {
                        return this.firestore.doc<Product>(`products/${val}`).get().pipe(
                            map(item => ({ ...item.data(), uid: item.id }))
                        );
                    })
                ]);
            }),
            map(([carts, ...products]) => {
                if (!carts?.length) return [];

                return carts.map(val => {
                    const items = val.items.map(item => {
                        const product = products.find(p => p.uid === item.productId);

                        return { ...product, qty: item.qty };
                    });

                    return {
                        ...val,
                        items,
                        total: round(items.reduce((acc, item) => acc + item.price * item.qty, 0), 2)
                    }
                });
            })
        ).subscribe(carts => this.carts = carts);
    }

    public destroy() {
        this.userId = null;
        this.cart = [];
        this.carts = [];
        this.total = 0;

        this.cartSub?.unsubscribe();
    }

    private saveCart(products: Array<Product & { qty: number }>, uid?: string): void {
        const cart: Cart = {
            userId: uid || this.userId,
            items: products.filter(val => val.qty).map(val => ({ productId: val.uid, qty: val.qty }))
        };

        this.firestore.doc(`carts/${uid || this.userId}`).set(cart).catch(() => 0);
    }
}

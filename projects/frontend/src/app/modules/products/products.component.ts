import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Product } from 'src/models/Product';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
    public products$: Observable<Product[]>;

    constructor(
        private firestore: AngularFirestore
    ) { }

    ngOnInit(): void {
        this.products$ = this.firestore.collection<Product>('products').valueChanges({ idField: 'uid' });
    }

}

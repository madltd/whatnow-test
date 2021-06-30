import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbLayoutModule, NbSidebarModule } from '@nebular/theme';
import { NbIconModule } from '@nebular/theme';

import { ProductComponent } from './components/product/product.component';

const imports = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NbLayoutModule,
    NbIconModule,
    NbSidebarModule,
    NbButtonModule
];

const declarations = [
    ProductComponent,
];

@NgModule({
    declarations,
    imports,
    exports: [...imports, ...declarations]
})
export class SharedModule { }

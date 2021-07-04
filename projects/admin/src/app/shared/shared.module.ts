import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbLayoutModule } from '@nebular/theme';
import { NbIconModule } from '@nebular/theme';

const imports = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NbLayoutModule,
    NbIconModule,
    NbButtonModule
];

const declarations = [
];

@NgModule({
    declarations,
    imports,
    exports: [...imports, ...declarations]
})
export class SharedModule { }

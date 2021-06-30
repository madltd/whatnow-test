import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NbThemeModule, NbSidebarModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { throwIfAlreadyLoaded } from './module-import.guard';


@NgModule({
    declarations: [],
    imports: [
        NbThemeModule.forRoot({ name: 'corporate' }),
        NbSidebarModule.forRoot(),
        NbEvaIconsModule
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}

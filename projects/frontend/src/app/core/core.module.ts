import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NbThemeModule, NbSidebarModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { throwIfAlreadyLoaded } from './module-import.guard';


@NgModule({
    declarations: [],
    imports: [
        NbThemeModule.forRoot({ name: 'corporate' }),
        NbSidebarModule.forRoot(),
        NbEvaIconsModule,
        AngularFireModule.initializeApp({
            apiKey: 'AIzaSyD5UakwPI8P9MjDKAI81li3aDTvge2dKes',
            authDomain: 'whatnowtest-76f6a.firebaseapp.com',
            projectId: 'whatnowtest-76f6a',
            storageBucket: 'whatnowtest-76f6a.appspot.com',
            messagingSenderId: '888085725665',
            appId: '1:888085725665:web:d8b95db927aeab3ae592a0'
        }),
        AngularFirestoreModule
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}

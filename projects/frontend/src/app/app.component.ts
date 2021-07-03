import { Component, OnInit } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { NbSidebarService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public sideBarState = 'expanded';
    public isAuthenticated$: Observable<boolean>;
    public cartTotal = 0;

    constructor(
        private sidebarService: NbSidebarService,
        private authService: NbAuthService
    ) { }

    ngOnInit() {
        this.isAuthenticated$ = this.authService.onAuthenticationChange().pipe(
            tap(isAuthenticated => {
                if (!isAuthenticated) this.sidebarService.collapse();
            })
        );
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

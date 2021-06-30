import { Component } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public sideBarState = 'expanded';

    constructor(
        private sidebarService: NbSidebarService
    ) { }

    public toggle(): void {
        this.sidebarService.toggle();
    }

    public test(e) {
        console.log(e);
    }
}

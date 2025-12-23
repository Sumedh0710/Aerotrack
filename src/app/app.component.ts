
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterModule, RouterLinkActive],
    templateUrl: './app.component.html'
})
export class AppComponent {}

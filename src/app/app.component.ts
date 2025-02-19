import { Component } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import {RouterOutlet} from '@angular/router';
import {TuiRoot} from '@taiga-ui/core';
import {TuiNavigation} from '@taiga-ui/layout';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss',
  imports: [HeaderComponent, RouterOutlet, TuiRoot, TuiNavigation]
})
export class AppComponent {
  title = 'heb-challenge';
}

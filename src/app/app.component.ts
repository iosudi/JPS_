import { Component } from '@angular/core';
import { slider } from './Route-Animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slider],
})
export class AppComponent {
  title = 'JPS_';
}

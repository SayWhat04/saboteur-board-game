import {Component} from '@angular/core';
import {AuthService} from '../../authentication/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  constructor(public auth: AuthService) {
  }
}

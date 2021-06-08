import {Component} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from './core/authentication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public auth: AuthService, firestore: AngularFirestore) {
  }
}

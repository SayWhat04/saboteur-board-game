import {NgModule} from '@angular/core';
import {ToolbarComponent} from './header/toolbar/toolbar.component';
import {SharedModule} from '../shared/shared.module';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    AngularFirestoreModule,
    AngularFireAuthModule,
    SharedModule
  ],
  exports: [
    ToolbarComponent
  ],
  entryComponents: [],
  providers: []
})
export class CoreModule {
}

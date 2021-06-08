import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialog} from '@angular/material/dialog';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AppRoutingModule} from '../app-routing/app-routing.module';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core/core.module';
import {GameInstanceModule} from './modules/game-instance/game-instance.module';
import {GameLobbyModule} from './modules/game-lobby/game-lobby.module';
import {HomeModule} from './modules/home/home.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    SharedModule,
    CoreModule,
    GameInstanceModule,
    GameLobbyModule,
    HomeModule,

    AppRoutingModule
  ],
  entryComponents: [],
  providers: [MatDialog],
  bootstrap: [AppComponent]
})
export class AppModule {
}

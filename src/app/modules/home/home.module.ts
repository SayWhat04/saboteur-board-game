import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {HomeComponent} from './components/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    HomeComponent
  ],
  entryComponents: [],
  providers: []
})
export class HomeModule {
}

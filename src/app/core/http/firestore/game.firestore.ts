import {Injectable} from '@angular/core';
import {FirestoreService} from './firestore.service';
import {Game} from '../../../shared/models/game';

@Injectable({
  providedIn: 'root'
})
export class GameFirestore extends FirestoreService<Game> {
  protected basePath = 'games';
}

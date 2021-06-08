import {Injectable} from '@angular/core';
import {GameFirestore} from '../../../core/http/firestore/game.firestore';
import {GamesStore} from '../store/games-store.service';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Game} from '../../models/game';
import {CurrentGameStore} from '../store/current-game-store.service';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(
    private firestore: GameFirestore,
    private gamesStore: GamesStore,
    private currentGameStore: CurrentGameStore // TODO: Unused, remove
  ) {
    this.firestore.collection$().pipe(
      tap(games => {
        this.gamesStore.patch({
          loading: false,
          games
        });
      })
    ).subscribe();
  }

  get games$(): Observable<Game[]> {
    return this.gamesStore.state$.pipe(
      map(state => state.loading ? [] : state.games),
    );
  }

  get loading$(): Observable<boolean> {
    return this.gamesStore.state$.pipe(
      map(state => state.loading)
    );
  }

  get noResults$(): Observable<boolean> {
    return this.gamesStore.state$.pipe(
      map(state => {
        return !state.loading
          && state.games
          && state.games.length === 0;
      })
    );
  }

  getGame$(gameId: string): Observable<Game> {
    this.firestore.doc$(gameId).pipe(
      tap(game => {
        this.currentGameStore.set({
          loading: false,
          game
        });
      })
    ).subscribe();

    return this.currentGameStore.state$.pipe(
      map(state => state.game)
    );
  }

  getGame(gameId: string): Game {
    this.firestore.doc$(gameId).pipe(
      tap(game => {
        this.currentGameStore.set({
          loading: false,
          game
        });
      })
    ).subscribe();

    return this.currentGameStore.state.game;
  }

  create(game: Game) {
    this.gamesStore.patch({
      loading: true,
      games: []
    });

    return this.firestore.create(game);
  }

  delete(id: string) {
    this.gamesStore.patch({
      loading: true,
      games: []
    });

    return this.firestore.delete(id).catch(error => {
      this.gamesStore.patch({
        loading: false
      });
    });
  }

  modifyArrayValue<K extends keyof Game>(id: string, fieldName: K, fieldValue: any) {
    this.gamesStore.patch({
      loading: true,
      games: []
    });

    return this.firestore.modifyArrayValue(id, fieldName, fieldValue).catch(error => {
      this.gamesStore.patch({
        loading: false
      });
    });
  }

  patchNonArrayValue(id: string, partialGame: Partial<Game>) {
    this.gamesStore.patch({
      loading: true,
      games: []
    });
    return this.firestore.patchNonArrayValue(id, partialGame).catch(error => {
      this.gamesStore.patch({
        loading: false
      });
    });
  }
}

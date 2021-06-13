import {Injectable} from '@angular/core';
import {PlayerRole} from '../models/player-role.enum';
import {GoldNuggetsDeck} from '../models/decks/gold-nuggets-deck';
import {Player} from '../models/player';
import {Card} from '../models/cards/card';
import {GameDeck} from '../models/decks/game-deck';
import {CardType} from '../models/cards/card-type-property.enum';
import {Board} from '../models/board/board';
import {BoardToDbBoardConverter} from './board/board-to-db-board-converter';
import {Game} from '../models/game';
import {GoldNuggetCard} from '../models/cards/gold-nugget-card';
import {GOLD_FOR_SABOTEURS, IMAGES_PATH, MINERS, SABOTEURS, STARTING_HAND} from '../../configs/game-specific-const';
import {GamesService} from './games/games.service';
import {PathCard} from '../models/cards/path-card';
import {ChatService} from '../../modules/game-instance/chat/services/chat.service';
import {AuthService} from '../../core/authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GameLogicController {
  constructor(private boardToDbBoardConverter: BoardToDbBoardConverter,
              private gamesService: GamesService,
              private chatService: ChatService,
              private auth: AuthService) {
  }

  // TODO: maxNumberOfPlayers can be refactored tu use current number of players
  async startRound(gameId: string, game: Game) {
    // 1. Pick a role for each player (Saboteur or Miner).
    // Generate array with roles and later, during iteration, draw role.
    const noOfSaboteurs = SABOTEURS.get(game.maxNumberOfPlayers);
    const noOfMiners = MINERS.get(game.maxNumberOfPlayers);

    const playersRoles = new Array<PlayerRole>();
    for (let i = 0; i < noOfSaboteurs; i++) {
      playersRoles.push(PlayerRole.SABOTEUR);
    }
    for (let i = 0; i < noOfMiners; i++) {
      playersRoles.push(PlayerRole.MINER);
    }

    // 2. Generate game-instance deck.
    const gameDeck = new GameDeck();

    // 3. Draw a starting hand for each player.
    const handSize = STARTING_HAND.get(game.maxNumberOfPlayers);

    game.players.forEach(player => {
      player.cardsInHand = [];
      player.isLampValid = true;
      player.isCartValid = true;
      player.isPickaxeValid = true;
      for (let i = 0; i < handSize; i++) {
        player.cardsInHand.push(Object.assign({}, gameDeck.drawCard()));
      }
      const randomRoleIndex = Math.floor(Math.random() * playersRoles.length);
      player.playerRole = playersRoles[randomRoleIndex];
      playersRoles.splice(randomRoleIndex, 1);
    });

    // 4. Draw starting player and set 'currentPlayerIndex' parameter.
    const currentPlayerIndex1 = Math.floor(Math.random() * (game.players.length));

    // 5. Push rest of a deck to game-instance state
    const deckState1 = gameDeck.cards.map(card => Object.assign({}, card));

    // 6. Generate discard deck.
    const discardPile: Array<Card> = new Array<Card>();
    discardPile.push(Object.assign({}, new Card(CardType.PLACEHOLDER, `${IMAGES_PATH}end_placeholder.png`)));

    // 7. Create initial board state.
    const board = new Board();

    // 8. Increment round number.
    const newRoundNumber = game.roundNumber + 1;

    const newRoundGameState: Partial<Game> = {
      players: game.players,
      currentPlayerIndex: currentPlayerIndex1,
      deckState: deckState1,
      discardPileState: discardPile,
      boardState: this.boardToDbBoardConverter.convert(board),
      roundNumber: newRoundNumber
    };
    await this.gamesService.patchNonArrayValue(gameId, newRoundGameState);
  }

  getWinnerRole(game: Game): PlayerRole {
    if (game.boardState.isGoldFound) {
      return PlayerRole.MINER;
    } else if (this.didSaboteursWon(game)) {
      return PlayerRole.SABOTEUR;
    } else if (this.didNobodyWon(game)) {
      return PlayerRole.NONE;
    } else {
      // Round is not ended yet
      return PlayerRole.NOT_SET;
    }
  }

  private didSaboteursWon(game: Game) {
    return game.players.some(player => player.playerRole === PlayerRole.SABOTEUR)
      && game.deckState.length === 0
      && game.players.every(player => player.cardsInHand.length === 0);
  }

  private didNobodyWon(game: Game) {
    return game.players.every(player => player.playerRole === PlayerRole.MINER)
      && game.deckState.length === 0
      && game.players.every(player => player.cardsInHand.length === 0);
  }

  incrementPlayerIndex(currentPlayerIndex: number, players: Array<Player>): number {
    let index = 0;
    do {
      index = (currentPlayerIndex + 1) % players.length;
    }
    while (players[index].cardsInHand.length === 0);
    return index;
  }

  // TODO: Re-factor
  async distributeGold(game: Game, gameId: string) {
    const winnerRole = this.getWinnerRole(game);
    const goldNuggetsDeckState = game.goldNuggetsDeckState;
    const goldNuggetDeck = new GoldNuggetsDeck(goldNuggetsDeckState);
    const tempPlayers = game.players;

    switch (winnerRole) {
      case PlayerRole.NOT_SET: {
        break;
      }

      case PlayerRole.MINER: {
        const noOfMiners = game.players
          .filter(player => player.playerRole === PlayerRole.MINER).length;

        const minersRewardNuggets = this.getRewardForMiners(noOfMiners, goldNuggetDeck);

        let tempIndex = game.currentPlayerIndex;
        do {
          if (tempPlayers[tempIndex].playerRole === PlayerRole.MINER) {
            tempPlayers[tempIndex].collectedGold.push(minersRewardNuggets.shift());
          }
          (tempIndex - 1) >= 0 ? tempIndex-- : tempIndex = tempPlayers.length - 1;
        } while (tempIndex !== game.currentPlayerIndex);

        const updatedState: Partial<Game> = {
          goldNuggetsDeckState: goldNuggetDeck.cards,
          players: tempPlayers
        };
        await this.gamesService.patchNonArrayValue(gameId, updatedState);
        await this.startRound(gameId, game);
        break;
      }

      case PlayerRole.SABOTEUR: {
        const noOfSaboteurs = game.players
          .filter(player => player.playerRole === PlayerRole.SABOTEUR).length;
        const rewardGoldNuggets =
          this.getRewardForSaboteurs(noOfSaboteurs, goldNuggetDeck);

        tempPlayers
          .filter(player => player.playerRole === PlayerRole.SABOTEUR)
          .forEach(saboteur => saboteur.collectedGold.push(...rewardGoldNuggets.pop()));

        const updatedGameState: Partial<Game> = {
          players: tempPlayers,
          goldNuggetsDeckState: goldNuggetDeck.cards
        };
        await this.gamesService.patchNonArrayValue(gameId, updatedGameState);
        await this.startRound(gameId, game);
        break;
      }

      case PlayerRole.NONE: {
        await this.startRound(gameId, game);
        break;
      }
    }
  }

  getRewardForMiners(noOfMiners: number, goldNuggetsDeck: GoldNuggetsDeck): Array<GoldNuggetCard> {
    const drawnCards = new Array<GoldNuggetCard>();

    for (let i = 0; i < noOfMiners; i++) {
      drawnCards.push(goldNuggetsDeck.drawCard());
    }
    drawnCards.sort((a, b) => (a.value < b.value) ? 1 : -1);
    return drawnCards;
  }

  getRewardForSaboteurs(noOfSaboteurs: number,
                        goldNuggetsDeck: GoldNuggetsDeck): Array<Array<GoldNuggetCard>> {
    goldNuggetsDeck.cards.sort((a, b) => (a.value < b.value) ? 1 : -1);

    const nuggetsPerSaboteur = new Array<Array<GoldNuggetCard>>();
    const sumOfGoldValues = GOLD_FOR_SABOTEURS.get(noOfSaboteurs);

    for (let i = 0; i < noOfSaboteurs; i++) {
      const cardsForSingleSabot = new Array<GoldNuggetCard>();
      let currentGoldSum = 0;
      let tempIndex = 0;
      while (currentGoldSum < sumOfGoldValues) {
        if ((currentGoldSum + goldNuggetsDeck.cards[tempIndex].value) <= sumOfGoldValues) {
          currentGoldSum = currentGoldSum + goldNuggetsDeck.cards[tempIndex].value;
          cardsForSingleSabot.push(goldNuggetsDeck.cards.splice(tempIndex, 1)[0]);
        }
        tempIndex++;
      }
      nuggetsPerSaboteur.push(cardsForSingleSabot);
    }
    goldNuggetsDeck.shuffle();
    return nuggetsPerSaboteur;
  }

  rotateCard(card: PathCard) {
    card.isRotated = !card.isRotated;
    card.bottomSide = [card.topSide, card.topSide = card.bottomSide][0];
    card.leftSide = [card.rightSide, card.rightSide = card.leftSide][0];
  }

  async endTurn(game: Game, gameId: string, loggedUserId: string) {
    const updatedGameState: Partial<Game> = {};

    const tempLoggedPlayer = game.players.find(player => player.uid === loggedUserId);
    if (game.deckState.length !== 0) {
      const tempDeck = game.deckState;
      tempLoggedPlayer.cardsInHand.push(tempDeck.shift());
      await this.gamesService.patchNonArrayValue(gameId, {deckState: tempDeck});
    }
    const playerIndex = game.players.indexOf(game.players
      .find(player => player.uid === loggedUserId));

    const tempPlayers = game.players;
    tempPlayers[playerIndex] = tempLoggedPlayer;
    await this.distributeGold(game, gameId);
    const tempCurrentPlayerIndex = this.incrementPlayerIndex(game.currentPlayerIndex, game.players);

    updatedGameState.players = tempPlayers;
    updatedGameState.currentPlayerIndex = tempCurrentPlayerIndex;

    await this.gamesService.patchNonArrayValue(gameId, updatedGameState);
  }

  async createGame(gameName: string, players: number) {
    const loggedUser = await this.createPlayer();
    const chat = await this.chatService.createChat();
    const goldNuggets = new GoldNuggetsDeck();
    const nuggets = goldNuggets.cards.map(card => Object.assign({}, card));

    const game: Game = {
      name: gameName,
      gameHost: loggedUser.uid,
      createdAt: Date.now(),
      started: false,
      finished: false,
      currentPlayerIndex: 0,
      maxNumberOfPlayers: players,
      players: [],
      boardState: Object.assign({}, this.boardToDbBoardConverter.convert(new Board())),
      chatId: chat.id,
      deckState: [],
      discardPileState: [],
      roundNumber: 0,
      goldNuggetsDeckState: nuggets,
    };
    const {id} = await this.gamesService.create(game);
    await this.gamesService.modifyArrayValue(id,
      'players', Object.assign({}, loggedUser));
    return id;
  }

  private async createPlayer() {
    const loggedUser = await this.auth.getUser();
    return new Player(loggedUser.displayName,
      [], [],
      true, true, true, true, PlayerRole.NOT_SET,
      new Array<GoldNuggetCard>(),
      loggedUser.uid);
  }

  public updatePlayerHand(players: Array<Player>, loggedUserId: string, cardsInHand: Array<Card>): Array<Player> {
    const playerIndex = players.indexOf(players.find(pl => pl.uid === loggedUserId));
    players[playerIndex].cardsInHand = cardsInHand;
    return players;
  }
}

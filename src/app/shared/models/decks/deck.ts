export abstract class Deck<T> {
  cards: Array<T>;

  protected constructor(cards?: Array<T>) {
    if (cards) {
      this.cards = cards;
    } else {
      this.cards = new Array<T>();
      this.fillDeck();
    }
    this.shuffle();
  }

  abstract fillDeck(): void;

  public shuffle(): void {
    let m = this.cards.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      const t = this.cards[m];
      this.cards[m] = this.cards[i];
      this.cards[i] = t;
    }
  }

  public drawCard(): T {
    return this.cards.shift();
  }
}

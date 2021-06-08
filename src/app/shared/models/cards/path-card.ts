import {PathCardSide} from './path-card-side-property.enum';
import {Card} from './card';
import {CardType} from './card-type-property.enum';

export class PathCard extends Card {
  // TODO: Re-factor order of fields
  constructor(
    public cardType: CardType,
    public leftSide: PathCardSide,
    public rightSide: PathCardSide,
    public topSide: PathCardSide,
    public bottomSide: PathCardSide,
    public enabled: boolean,
    public isRotated: boolean,
    public imagePath?: string,
    public imagePathRotated?: string,
    public isPassage?: boolean) {
    super(cardType, imagePath);
  }
}

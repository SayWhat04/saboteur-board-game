import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Player} from '../../../models/player';
import {GoldNuggetReward} from './gold-nugget-reward';

type KeysEnum<T> = { [P in keyof Required<T>]: true };
const goldNuggetRewardKeys: KeysEnum<GoldNuggetReward> = {
  player: true,
  gold: true
};

@Component({
  selector: 'app-end-game-summary-dialog',
  templateUrl: './end-game-summary-dialog.component.html',
  styleUrls: ['./end-game-summary-dialog.component.scss']
})
export class EndGameSummaryDialogComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[];

  constructor(@Inject(MAT_DIALOG_DATA) public players: Player[]) {
  }

  ngOnInit(): void {
    this.dataSource = this.prepareGoldSummaryData();
    this.displayedColumns = Object.keys(goldNuggetRewardKeys);
  }

  private prepareGoldSummaryData(): GoldNuggetReward[] {
    const summaryTableData: GoldNuggetReward[] = this.players.map(player => {
      return {
        player: player.name,
        gold: player.collectedGold
          .map(gold => gold.value)
          .reduce((prev, curr) => prev + curr, 0)
      };
    });
    summaryTableData
      .sort((a, b) =>
        (a.gold < b.gold) ? 1 : -1);
    return summaryTableData;
  }
}

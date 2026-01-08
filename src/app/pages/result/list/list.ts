import { Component, Signal } from '@angular/core';
import { Item } from '../item/item';
import { TournamentStore } from '../../../store/tournament.store';

@Component({
  selector: 'app-list',
  imports: [Item],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  tournament!: Signal<any>;
  constructor(private _store: TournamentStore) {
    this.tournament = this._store.top8Data; // this is a SIGNAL
    console.log(this.tournament())
  }
}

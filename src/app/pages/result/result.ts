import { Component, Signal } from '@angular/core';
import { List } from './list/list';
import { TournamentStore } from '../../store/tournament.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  imports: [List],
  templateUrl: './result.html',
  styleUrl: './result.scss',
})
export class Result {
  tournament!: Signal<any>;
  constructor(private _store: TournamentStore, private _router: Router) {
    this.tournament = this._store.top8Data; // this is a SIGNAL

    if (!this.tournament || !this.tournament().id) {
      this._router.navigate(['/']);
    }
  }
}

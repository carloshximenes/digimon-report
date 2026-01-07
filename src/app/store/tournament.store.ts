import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TournamentStore {
  // This will hold your form value
  top8Data = signal<any>(null);

  setTop8(data: any) {
    this.top8Data.set(data);
  }

  clear() {
    this.top8Data.set(null);
  }
}

import { Component } from '@angular/core';
import { Item } from '../item/item';

@Component({
  selector: 'app-list',
  imports: [Item],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  items = [
    {
      position: 1,
      name: 'BW Gallantmon',
      author: 'RafaLopes',
      colors: ['red'],
      refs: ['BT12-020'],
    },
    {
      position: 2,
      name: 'LOPMon Loop',
      author: 'KaiqueH',
      colors: ['purple', 'yellow', 'red'],
      refs: ['BT10-021', 'BT15-078', 'EX5-019'],
    },
    {
      position: 3,
      name: 'Blue Flare',
      author: 'Andrei',
      colors: ['blue'],
      refs: ['BT10-021', 'BT10-024'],
    },
    {
      position: 4,
      name: 'Garurumon X',
      author: 'Leo',
      colors: ['blue', 'white'],
      refs: ['BT11-032'],
    },
    {
      position: 5,
      name: 'Red Hybrid',
      author: 'Rian',
      colors: ['red', 'yellow'],
      refs: ['BT11-011'],
    },
    {
      position: 6,
      name: 'Beelzemon',
      author: 'Vitu',
      colors: ['purple'],
      refs: ['EX2-044', 'EX2-073'],
    },
    {
      position: 7,
      name: 'BloomLord',
      author: 'Goku',
      colors: ['green', 'blue'],
      refs: ['BT10-054'],
    },
    {
      position: 8,
      name: 'Alphamon Ouryuken',
      author: 'Arthur',
      colors: ['black'],
      refs: ['BT11-066'],
    },
  ];
}

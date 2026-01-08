import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item',
  imports: [],
  templateUrl: './item.html',
  styleUrl: './item.scss',
})
export class Item {
  @Input({ required: true }) data!: any;

  getGradient(colors: string[]) {
    if (!colors || colors.length === 0) return '';

    colors = colors.map((c) => {
      if (c == 'white') {
        c = '#e7e7e7';
      }

      return c;
    });

    if (colors.length === 1) {
      return colors[0];
    }

    if (colors.length === 2) {
      return `linear-gradient(90deg, ${colors[0]} 0%, ${colors[1]} 100%)`;
    }

    if (colors.length === 3) {
      return `linear-gradient(
        90deg,
        ${colors[0]} 0%,
        ${colors[1]} 50%,
        ${colors[2]} 100%
      )`;
    }

    const step = 100 / (colors.length - 1);
    const stops = colors.map((c, i) => `${c} ${i * step}%`).join(', ');

    return `linear-gradient(90deg, ${stops})`;
  }
}

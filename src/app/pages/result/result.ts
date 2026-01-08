import { Component, ElementRef, Signal, ViewChild } from '@angular/core';
import { List } from './list/list';
import { TournamentStore } from '../../store/tournament.store';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { MomentPipe } from '../../pipes/moment.pipe';

@Component({
  selector: 'app-result',
  imports: [List, MomentPipe],
  templateUrl: './result.html',
  styleUrl: './result.scss',
})
export class Result {
  @ViewChild('scrollable') scrollable!: ElementRef;

  tournament!: Signal<any>;
  constructor(private _store: TournamentStore, private _router: Router) {
    this.tournament = this._store.top8Data; // this is a SIGNAL

    if (!this.tournament || !this.tournament()?.id) {
      this._router.navigate(['/']);
    }
  }

  ngAfterViewInit(): void {
    this.scrollable.nativeElement.scrollIntoView({ behavior: 'auto', block: 'start' });
  }

  get showDownloadButton() {
    return this._router.url.includes('result');
  }

  downloadImage(): void {
    const theEl = document.getElementById('downloadEl');
    if (!theEl) return;

    html2canvas(theEl, {
      useCORS: true, // Loads external images (logos, backgrounds)
      allowTaint: false, // Prevents tainted canvas errors
      logging: false, // Disable internal logs for cleaner console
      backgroundColor: null, // Keep UI transparency if needed
      scale: 2, // Improves output quality (like Retina mode)
      scrollX: 0,
      scrollY: 0,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight,
    }).then((canvas) => {
      canvas.toBlob((blob) => {
        if (!blob) return;

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = 'report.png';
        link.click();

        URL.revokeObjectURL(url);
      });
    });
  }
}

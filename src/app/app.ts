import { Component, signal, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as htmlToImage from 'html-to-image';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('digimon-report');

  constructor(private renderer: Renderer2) {}

  downloadDataUrl(dataUrl: string, filename: string): void {
    const a = this.renderer.createElement('a');
    this.renderer.setAttribute(a, 'href', dataUrl);
    this.renderer.setAttribute(a, 'download', filename);

    this.renderer.appendChild(document.body, a);
    a.click();
    this.renderer.removeChild(document.body, a);
  }

  downloadImage(): void {
    const theEl = document.getElementById('downloadEl');
    if (!theEl) return;

    htmlToImage.toPng(theEl).then((dataUrl) => {
      this.downloadDataUrl(dataUrl, 'some-file.png');
    });
  }
}

import { Component, signal, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import html2canvas from 'html2canvas';
// declare let html2canvas: any;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('digimon-report');

  constructor(private renderer: Renderer2) {}

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

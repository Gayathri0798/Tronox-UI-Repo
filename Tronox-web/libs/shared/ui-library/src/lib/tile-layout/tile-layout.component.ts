import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { TileViewComponent } from '../tile-view/tile-view.component';

@Component({
  selector: 'lib-tile-layout',
  imports: [CommonModule, MatGridListModule, TileViewComponent],
  templateUrl: './tile-layout.component.html',
  styleUrl: './tile-layout.component.scss',
})
export class TileLayoutComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedAppFromSubmenu']) {
      // If it's the first change, just set tilesCopy without fade-out
      if (!this.initialized) {
        this.tilesCopy = this.tiles.filter(
          (tile: any) => tile.appName === this.selectedAppFromSubmenu
        );
        this.initialized = true;
      } else {
        this.tilesCopy = this.tilesCopy.map((tile: any) => ({
          ...tile,
          hide: true,
        })); // Trigger fade-out
        setTimeout(() => {
          this.tilesCopy = this.tiles
            .filter((tile: any) => tile.appName === this.selectedAppFromSubmenu)
            .map((tile: any) => ({ ...tile, hide: false }));
        }, 300);
      }
    }
  }
  @Input() tiles: any;
  @Input() selectedAppFromSubmenu: any;
  @Input() tilesCopy: any;
  initialized = false;
}

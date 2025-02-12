import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { TileViewComponent } from '../tile-view/tile-view.component';
@Component({
  selector: 'lib-tile-layout',
  imports: [CommonModule, MatGridListModule, TileViewComponent],
  templateUrl: './tile-layout.component.html',
  styleUrl: './tile-layout.component.scss',
})
export class TileLayoutComponent {
  @Input() tiles: any;
}

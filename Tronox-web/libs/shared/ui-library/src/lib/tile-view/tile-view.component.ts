import { Component, inject, Input } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TileDialogBoxComponent } from '../tile-dialog-box/tile-dialog-box.component';
@Component({
  selector: 'lib-tile-view',
  imports: [CommonModule, MatCardModule, MatDialogModule],
  templateUrl: './tile-view.component.html',
  styleUrl: './tile-view.component.scss',
})
export class TileViewComponent {
  @Input() tile: any;
  private dialog = inject(MatDialog);

  openDialog(tile: any): void {
    this.dialog.open(TileDialogBoxComponent, {
      disableClose: true,
      width: '1000px',
      height: '800px',
      data: { tile },
    });
  }
}

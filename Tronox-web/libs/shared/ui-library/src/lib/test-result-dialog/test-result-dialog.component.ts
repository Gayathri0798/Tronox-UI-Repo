import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { TileService } from '@tronox-web/util-library';

@Component({
  selector: 'lib-test-result-dialog',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './test-result-dialog.component.html',
  styleUrl: './test-result-dialog.component.scss',
})
export class TestResultDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TestResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly tileService: TileService
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}

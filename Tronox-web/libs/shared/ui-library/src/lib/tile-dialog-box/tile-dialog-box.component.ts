import { Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  MatDialogModule,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TileService } from '@tronox-web/util-library';
import { TestResultDialogComponent } from '../test-result-dialog/test-result-dialog.component';

@Component({
  selector: 'lib-tile-dialog-box',
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './tile-dialog-box.component.html',
  styleUrl: './tile-dialog-box.component.scss',
})
export class TileDialogBoxComponent {
  constructor(
    public dialogRef: MatDialogRef<TileDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly tileService: TileService
  ) {}

  fileName: string | null = null;
  fileUrl: string | null = null;
  fileUploaded = false;
  isProcessing = false;
  file: File | undefined;
  private dialog = inject(MatDialog);

  onFileSelected(event: any): void {
    this.file = event.target.files[0];

    if (this.file) {
      this.fileName = this.file.name;

      // Create a temporary URL for downloading
      const objectUrl = URL.createObjectURL(this.file);
      this.fileUrl = objectUrl;
      this.fileUploaded = true;
    }
  }

  runScript(): void {
    this.isProcessing = true; // Show spinner

    if (this.file) {
      this.tileService.uploadExcelToServer(this.file).subscribe({
        next: (response) => {
          console.log('File uploaded successfully:', response);
          this.isProcessing = false;
          this.closeDialog();
          this.openResultsDialog(response);
        },
        error: (error) => {
          console.error('Error uploading file:', error);
          this.isProcessing = false;
          this.closeDialog();
          this.openResultsDialog(error);
        },
      });
    }
  }

  openResultsDialog(result: any) {
    this.dialog.open(TestResultDialogComponent, {
      disableClose: true,
      height: '800px',
      width: '1200px',
      data: result,
    });
  }

  closeDialog(): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    URL.revokeObjectURL(this.fileUrl!);
    this.dialogRef.close();
  }

  // closeDialog(): void {
  //   this.dialogRef.close();
  // }
}

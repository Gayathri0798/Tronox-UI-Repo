import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  MatDialogModule,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  fileName: string | null = null;
  fileUrl: string | null = null;
  fileUploaded = false;
  isProcessing = false;

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      // Create a temporary URL for downloading
      const objectUrl = URL.createObjectURL(file);
      this.fileUrl = objectUrl;
      this.fileUploaded = true;
    }
  }

  runScript(): void {
    this.isProcessing = true; // Show spinner

    setTimeout(() => {
      this.isProcessing = false; // Hide spinner after delay
      console.log('Script executed successfully for:', this.fileName);
      //alert(`Script executed successfully for ${this.fileName}`);
    }, 3000); // Simulate 3s API call
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

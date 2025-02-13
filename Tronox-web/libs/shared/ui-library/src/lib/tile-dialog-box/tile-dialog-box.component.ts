import { AfterViewChecked, Component, ElementRef, inject, Inject, ViewChild } from '@angular/core';
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
  MatDialogClose,
} from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TileService } from '@tronox-web/util-library';
import { TestResultDialogComponent } from '../test-result-dialog/test-result-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'lib-tile-dialog-box',
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogClose,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
  ],
  templateUrl: './tile-dialog-box.component.html',
  styleUrl: './tile-dialog-box.component.scss',
})
export class TileDialogBoxComponent implements AfterViewChecked {
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
  result: any;
  private dialog = inject(MatDialog);
  previousResultLength: any;
  @ViewChild('resultsContainer') resultsContainer: ElementRef | undefined;

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
    if (!this.file) return;

    this.isProcessing = true;
    this.result = ''; // Clear previous results

    this.tileService
      .uploadAndFetchRealTimeRes(this.file, this.data?.tile?.appNamespec)
      .subscribe({
        next: (chunk) => {
          this.result += chunk;
        },
        error: (error) => {
          console.error('Error uploading file:', error);
          this.isProcessing = false;
        },
        complete: () => {
          console.log('File processing complete');
          this.isProcessing = false;
        },
      });
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

  scrollToBottom() {
    if (this.resultsContainer) {
      this.resultsContainer.nativeElement.scrollTop =
        this.resultsContainer.nativeElement.scrollHeight;
    }
  }

  ngAfterViewChecked() {
    if (
      this.resultsContainer &&
      this.result.length > this.previousResultLength
    ) {
      this.scrollToBottom();
    }
    this.previousResultLength = this.result.length;
  }
}

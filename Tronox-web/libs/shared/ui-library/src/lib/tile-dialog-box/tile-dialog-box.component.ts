import {
  AfterViewChecked,
  Component,
  ElementRef,
  inject,
  Inject,
  ViewChild,
} from '@angular/core';
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
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
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
    MatIconModule,
    MatTableModule,
  ],
  templateUrl: './tile-dialog-box.component.html',
  styleUrl: './tile-dialog-box.component.scss',
})
export class TileDialogBoxComponent implements AfterViewChecked {
  hasResults = true;
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
  wordFileBlob: Blob | null = null; // Variable to store the file
  testResults: any[] = [];
  @ViewChild('resultsContainer') resultsContainer: ElementRef | undefined;
  @ViewChild('resultsTable') resultsTable!: ElementRef;
  onFileSelected(event: any): void {
    this.file = event.target.files[0];

    if (this.file) {
      this.fileName = this.file.name;

      // Create a temporary URL for downloading
      const objectUrl = URL.createObjectURL(this.file);
      this.fileUrl = objectUrl;
      this.fileUploaded = true;
      this.wordFileBlob = null;
    }
  }

  runScript(): void {
    if (!this.file) return;

    this.isProcessing = true;
    this.wordFileBlob = null;
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
          this.fetchTestResults();
        },
        complete: () => {
          console.log('✅ File processing complete');
          this.isProcessing = false;
          this.fetchTestResults();
          // Fetch the Word document result and store it
          // this.tileService.getWordDocResult().subscribe({
          //   next: (blob: Blob) => {
          //     console.log('📄 Word file received');
          //     this.wordFileBlob = blob;
          //   },
          //   error: (err) => {
          //     console.error('❌ Error fetching Word file:', err);
          //     alert('Failed to fetch Word file.');
          //   },
          // });
        },
      });
  }

  fetchTestResults() {
    this.tileService.getTestCaseResults().subscribe({
      next: (results) => {
        this.testResults = results;
        this.hasResults = this.testResults.length > 0;
        //console.log('Lav', this.testResults);
      },
      error: (err) => {
        console.error('Error fetching test results:', err);
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

  downloadTemplate(): void {
    if (!this.wordFileBlob) {
      alert('No file available for download. Please run the script first.');
      return;
    }

    const a = document.createElement('a');
    const objectUrl = URL.createObjectURL(this.wordFileBlob);
    a.href = objectUrl;
    a.download = `Screenshots_${Date.now()}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);

    console.log('📥 Word file downloaded');
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
    this.adjustDialogHeight();
    if (
      this.resultsContainer &&
      this.result.length > this.previousResultLength
    ) {
      this.scrollToBottom();
    }
    this.previousResultLength = this.result.length;
  }

  adjustDialogHeight() {
    if (this.resultsTable?.nativeElement) {
      const tableHeight = this.resultsTable.nativeElement.offsetHeight;
      const baseHeight = 400; // Minimum dialog height
      const maxHeight = 700; // Prevent excessive height growth

      const newHeight = Math.min(baseHeight + tableHeight, maxHeight);
      this.dialogRef.updateSize('600px', `${newHeight}px`);
    }
  }
}

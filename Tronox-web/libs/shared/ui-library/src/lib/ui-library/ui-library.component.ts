import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-ui-library',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './ui-library.component.html',
  styleUrl: './ui-library.component.scss',
})
export class UiLibraryComponent {}

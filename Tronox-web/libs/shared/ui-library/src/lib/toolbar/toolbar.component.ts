import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '@tronox-web/util-library';
@Component({
  selector: 'lib-toolbar',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatMenuModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent implements OnInit {
  @Input() className: any;
  @Input() drawerContent: any;
  @Input() showSearch = false;
  @Input() imageSrc = '';
  @Input() searchQuery: any;
  userName: any;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.userName = localStorage.getItem('tronox_username');
  }

  onLogoutClick() {
    this.authService.logout();
  }
}

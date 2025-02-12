import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TileLayoutComponent } from '../tile-layout/tile-layout.component';
import { TileService } from '@tronox-web/util-library';
@Component({
  selector: 'lib-drawer-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    ToolbarComponent,
    TileLayoutComponent,
  ],
  templateUrl: './drawer-layout.component.html',
  styleUrl: './drawer-layout.component.scss',
})
export class DrawerLayoutComponent implements OnInit {
  @Input() isDrawerOpen = true;
  tiles: any;
  cols: any = 3;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly tileService: TileService
  ) {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.cols = 1;
        } else if (result.breakpoints[Breakpoints.Small]) {
          this.cols = 2;
        } else if (result.breakpoints[Breakpoints.Medium]) {
          this.cols = 3;
        } else if (result.breakpoints[Breakpoints.Large]) {
          this.cols = 4;
        } else if (result.breakpoints[Breakpoints.XLarge]) {
          this.cols = 5;
        }
      });
  }
  ngOnInit(): void {
    this.tileService.getTiles().subscribe((tiles: any) => {
      this.tiles = tiles;
      //console.log('Lav', tiles);
    });
  }
}

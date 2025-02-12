import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DrawerLayoutComponent } from '@tronox-web/ui-library';

@Component({
  imports: [RouterModule, DrawerLayoutComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Tronox-web';
  onButtonClick() {
    console.log('Button clicked!');
    alert('Button clicked!');
  }
}

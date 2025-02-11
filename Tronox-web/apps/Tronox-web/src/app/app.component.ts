import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { UiLibraryComponent } from '@tronox-web/ui-library';

@Component({
  imports: [RouterModule, UiLibraryComponent],
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

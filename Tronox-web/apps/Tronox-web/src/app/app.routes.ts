import { Route } from '@angular/router';
import { DrawerLayoutComponent, LoginComponent } from '@tronox-web/ui-library';
import { authGuard } from '@tronox-web/util-library';

export const appRoutes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'tile', component: DrawerLayoutComponent, canActivate: [authGuard] },
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';


export const ROUTES: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: AppComponent}
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);

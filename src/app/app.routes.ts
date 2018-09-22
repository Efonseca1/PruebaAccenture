import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { RegisterComponent} from './components/register/register.component';
import { AprobacionCreditoComponent} from './components/aprobacion-credito/aprobacion-credito.component';



const routes: Routes = [
    { path: 'registro', component: RegisterComponent },
    { path: 'credito', component: AprobacionCreditoComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule {}

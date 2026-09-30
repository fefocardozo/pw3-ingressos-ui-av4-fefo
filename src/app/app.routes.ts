import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { EmCartazComponent } from './shared/components/em-cartaz/em-cartaz';
import { DetalhesComponent } from './pages/filme/detalhes';
import { NotFoundComponent } from './shared/components/not-found/not-found';
import { SalaListaComponent } from './pages/admin/sala/sala-lista/sala-lista';
import { SalaFormComponent } from './pages/admin/sala/sala-form/sala-form';

export const routes: Routes = [
    {path: '',component: HomeComponent},
    {path:'filmes/em-cartaz', component: EmCartazComponent},
    {path:'filmes/detalhes/:id', component: DetalhesComponent},
	
    {path: 'salas', component: SalaListaComponent},
    {path: 'salas/novo', component: SalaFormComponent},

    {path:'not-found', component: NotFoundComponent},
    {path:'**', component: NotFoundComponent},
    
    { path: 'salas/:id/editar', component: SalaFormComponent },
    { path: '', redirectTo: 'salas', pathMatch: 'full' },
];
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddPessoaComponent } from './add-pessoa/add-pessoa.component';
import { ListPessoaComponent } from './list-pessoa/list-pessoa.component';
import { EditPessoaComponet } from './edit-pessoa/edit-pessoa.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'add-pessoa', component: AddPessoaComponent},
    {path: 'list-pessoa', component: ListPessoaComponent},
    {path: 'edit-pessoa/:id', component: EditPessoaComponet}
];

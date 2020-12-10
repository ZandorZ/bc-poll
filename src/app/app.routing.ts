import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { PollCreateComponent } from './poll-create/poll-create.component';
import { PollGridComponent } from './poll-grid/poll-grid.component';
import { PollViewComponent } from './poll-view/poll-view.component';

const routes: Routes = [
    {path: '', redirectTo: 'polls', pathMatch: 'full'},
    {path: 'polls', component: PollGridComponent},
    {path: 'create', component: PollCreateComponent},
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { PollCreateComponent } from './poll-create/poll-create.component';
import { PollGridComponent } from './poll-grid/poll-grid.component';
import { PollInfoComponent } from './poll-info/poll-info.component';
import { PollVoteComponent } from './poll-vote/poll-vote.component';

const routes: Routes = [
    {path: '', redirectTo: 'polls', pathMatch: 'full'},
    {path: 'polls', component: PollGridComponent},
    {path: 'create', component: PollCreateComponent},
    {path: 'info/:id', component: PollInfoComponent},
    {path: 'vote/:id', component: PollVoteComponent},
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

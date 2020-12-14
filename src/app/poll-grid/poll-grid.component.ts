import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { PollService } from '../services/poll.service';
import { Poll } from '../types';

@Component({
    selector: 'app-poll-grid',
    templateUrl: './poll-grid.component.html',
    styleUrls: ['./poll-grid.component.scss']
})
export class PollGridComponent implements OnInit {

    polls$: Observable<Poll[]> = from(this.pollService.getPolls());

    constructor(private pollService: PollService) { }

    ngOnInit(): void {
    }

}

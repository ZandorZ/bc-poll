import { Component, Input, OnInit } from '@angular/core';
import { Poll } from '../types';

@Component({
  selector: 'app-poll-view',
  templateUrl: './poll-view.component.html',
  styleUrls: ['./poll-view.component.scss']
})
export class PollViewComponent implements OnInit {

    @Input() poll: Poll;
    @Input() voted: boolean;

    totalVotes: number;

  constructor() { }

  ngOnInit(): void {
      if (this.poll.results.length > 0) {
        this.totalVotes = this.poll.results.reduce( (item, curr) => item + curr);
      } else {
        this.totalVotes = 0;
      }

  }

}

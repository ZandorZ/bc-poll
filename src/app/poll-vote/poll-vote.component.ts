import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PollService } from '../services/poll.service';
import { Poll } from '../types';

@Component({
    selector: 'app-poll-vote',
    templateUrl: './poll-vote.component.html',
    styleUrls: ['./poll-vote.component.scss']
})
export class PollVoteComponent implements OnInit {

    poll: Poll;

    voteForm = this.fb.group({
        vote: [null, Validators.required]
    });

    constructor(private route: ActivatedRoute, private fb: FormBuilder, private pollService: PollService) { }


    async ngOnInit(){
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.poll = await this.pollService.getPoll(id);

        //not found
        if(!this.poll){
            alert("Poll not found");
        }
    }

    onSubmit() {
        this.pollService.vote({
            id: this.poll.id,
            vote: this.voteForm.get('vote').value
        });
    }
}

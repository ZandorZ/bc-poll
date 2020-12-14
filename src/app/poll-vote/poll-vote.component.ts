import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private _snackBar:
        MatSnackBar,
        private router: Router,
        private pollService: PollService) { }


    async ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.check(id);
    }

    async onSubmit() {
        try {
            await this.pollService.vote({
                id: this.poll.id,
                vote: this.voteForm.get('vote').value
            });
            this._snackBar.open("You voted sucessfully", "OK", {
                duration: 2000,
            });

        } catch (e) {
            console.error(e);
        }
    }

    private async check(id: number){
        this.poll = await this.pollService.getPoll(id);
         //not found
         if (!this.poll) {
            alert("Poll not found");
        }
        if (this.poll.voted) {
            await this.router.navigate(['/info', id]);
        }
    }

}

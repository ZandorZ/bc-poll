import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Poll } from '../types';

@Component({
    selector: 'app-poll-vote',
    templateUrl: './poll-vote.component.html',
    styleUrls: ['./poll-vote.component.scss']
})
export class PollVoteComponent {

    @Input() poll: Poll;

    pollForm = this.fb.group({
        vote: [null, Validators.required]
    });

    constructor(private fb: FormBuilder) { }

    onSubmit() {
        console.log(this.pollForm.value)
    }
}

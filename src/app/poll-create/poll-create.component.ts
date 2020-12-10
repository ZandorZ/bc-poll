import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PollService } from '../services/poll.service';
@Component({
    selector: 'app-poll-create',
    templateUrl: './poll-create.component.html',
    styleUrls: ['./poll-create.component.scss']
})
export class PollCreateComponent {

    pollForm = this.fb.group({
        question: [null, [Validators.required, Validators.minLength(20)]],
        op1: [null, Validators.required],
        op2: [null, Validators.required],
        op3: [null, Validators.required],
        thumbnail: [null, [Validators.required, Validators.pattern('(http(s?):)([/|.|\\w|\\s|-])*\\.(?:jpg|gif|jpeg|png)')]]
    });

    hasUnitNumber = false;

    constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private pollService: PollService) {

    }

    async onSubmit() {
        try {
            const poll = this.pollForm.getRawValue() as any;
            await this.pollService.createPoll(poll.question, poll.thumbnail, [poll.op1, poll.op2, poll.op3]);
            this._snackBar.open("Poll was created sucessfully", "OK", {
                duration: 2000,
            });
            this.pollForm.reset();
            this.pollForm.clearValidators();
            this.pollForm.markAsPristine();
        } catch (e) {
            console.error(e);
        }
    }
}

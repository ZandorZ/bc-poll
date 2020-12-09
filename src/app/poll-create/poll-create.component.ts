import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
        image: [null, [Validators.required, Validators.pattern('(http(s?):)([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png)')]]
    });

    hasUnitNumber = false;

    constructor(private fb: FormBuilder) { }

    onSubmit() {
        console.log(this.pollForm.value);
    }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Poll } from '../types';

@Injectable({
    providedIn: 'root'
})
export class PollService {

    currentID = 3;

    polls: Poll[] = [
        {
            id: 1,
            options: ["Cats", "Dogs", "Both"],
            results: [4, 5, 6],
            question: "Do you like more cats or dogs?",
            thumbnail: "https://images.pexels.com/photos/1909802/pexels-photo-1909802.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=560"
        },
        {
            id: 2,
            options: ["June", "July","August", "September"],
            results: [2, 1, 10, 9],
            question: "Best month for summer holidays?",
            thumbnail: "https://images.pexels.com/photos/413960/pexels-photo-413960.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        },
        {
            id: 3,
            options: ["Red", "Green", "Blue"],
            results: [1, 4, 3],
            question: "Best color for your house?",
            thumbnail: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        },
    ];

    constructor() { }

     getPolls(): Observable<Poll[]> {
        return of(this.polls);
    }

    vote(pollId: number, voteNumber: number) {

    }

     createPoll(question: string, thumbnail: string, options: string[]): Promise<boolean> {
        this.currentID ++;
        this.polls.push({
            id: this.currentID,
            options: options,
            thumbnail: thumbnail,
            question: question,
            results: []
        });

        return Promise.resolve(true);
    }
}

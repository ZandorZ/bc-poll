import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Poll } from '../types';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

    polls: Poll[] = [
        {
            id: 1,
            options: [],
            results: [4, 5, 6],
            question: "Do you like more cats or dogs?",
            thumbnail: "https://images.pexels.com/photos/1909802/pexels-photo-1909802.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=560"
        },
        {
            id: 2,
            options: [],
            results: [2, 1, 10],
            question: "Best month for summer holidays?",
            thumbnail: "https://images.pexels.com/photos/413960/pexels-photo-413960.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        },
        {
            id: 3,
            options: [],
            results: [1, 4, 3],
            question: "Best color for your house?",
            thumbnail: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        },
    ];

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    constructor(private breakpointObserver: BreakpointObserver) { }

}

import { Component, Input, OnInit } from '@angular/core';
import ApexCharts from 'apexcharts';
import { Poll } from '../types';

@Component({
    selector: 'app-poll-info',
    templateUrl: './poll-info.component.html',
    styleUrls: ['./poll-info.component.scss']
})
export class PollInfoComponent implements OnInit {

    @Input() poll: Poll;

    constructor() { }

    ngOnInit(): void {
        this.generateChart();
    }

    generateChart() {
        const options:ApexCharts.ApexOptions = {
            series:[
                {
                    data: this.poll.results,
                }
            ],
            chart: {
                height: 350,
                type: 'bar',
            },
            plotOptions: {
                bar: {
                    columnWidth: '45%',
                    distributed: true,
                }
            },
            legend: {
                show: false
            },
            xaxis: {
                categories: this.poll.options
            }
        }

        const chart = new ApexCharts(document.getElementById("poll-chart"), options);
        chart.render();

    }

}

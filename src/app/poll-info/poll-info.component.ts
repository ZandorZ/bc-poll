import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ApexCharts from 'apexcharts';
import { PollService } from '../services/poll.service';
import { Poll } from '../types';

@Component({
    selector: 'app-poll-info',
    templateUrl: './poll-info.component.html',
    styleUrls: ['./poll-info.component.scss']
})
export class PollInfoComponent implements OnInit {

    poll:Poll;

    constructor(private route: ActivatedRoute, private pollService: PollService) {
    }

    async ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.poll = await this.pollService.getPoll(id);

        if(!!this.poll){
            this.generateChart();
        } else {
            alert("Poll not found");
        }
    }


    private generateChart() {
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

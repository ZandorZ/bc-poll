import { Injectable } from '@angular/core';
import { Poll, PollForm, PollVote } from '../types';
import { Web3Service } from './web3.service';
import { fromAscii, toAscii } from 'web3-utils';

@Injectable({
    providedIn: 'root'
})
export class PollService {

    constructor(private web3Serv: Web3Service) { }

    private normalizeVoter(voter: any) {
        return {
            id: voter[0],
            votedIds: voter[1].map(vote => parseInt(vote)),
        }
    }

    private normalizePoll(pollRaw: any, voter: any): Poll {
        return {
            id: pollRaw[0],
            question: pollRaw[1],
            thumbnail: pollRaw[2],
            results: pollRaw[3].map(vote => parseInt(vote)),
            options: pollRaw[4].map(opt => toAscii(opt).replace(/\u0000/g, '')),
            voted: voter.votedIds.length &&
                            voter.votedIds.find(votedId => votedId === parseInt(pollRaw[0])) != undefined,
        }
    }

    async getPoll(id: number): Promise<Poll> {
        const acc = await this.web3Serv.getAccount();
        const voter = await this.web3Serv.call('getVoter', acc);
        const voterNormalized = this.normalizeVoter(voter);
        const pollRaw = await this.web3Serv.call('getPoll', id);
        return this.normalizePoll(pollRaw, voterNormalized);
    }

    async getPolls(): Promise<Poll[]> {
        const polls: Poll[] = [];
        const acc = await this.web3Serv.getAccount();
        const voter = await this.web3Serv.call('getVoter', acc);
        const voterNormalized = this.normalizeVoter(voter);
        const totalPolls = await this.web3Serv.call('getTotalVotes');

        for (let i = 0; i < totalPolls; i++) {
            const pollRaw = await this.web3Serv.call('getPoll', i);
            const pollNormalized = this.normalizePoll(pollRaw, voterNormalized);
            polls.push(pollNormalized);
        }

        return polls;
    }

    vote(pollVote: PollVote): Promise<void> {
        return this.web3Serv.executeTransaction("vote", pollVote.id, pollVote.vote);
    }

    createPoll(pollForm: PollForm): Promise<void> {
        return this.web3Serv.executeTransaction(
            "createPoll",
            pollForm.question,
            pollForm.thumbnail || '',
            pollForm.options.map(opt => fromAscii(opt)));
    }
}

import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

declare var window: any;
const contractAbi = require("../../../ethereum/build/contracts/PollContract.json").abi;

@Injectable({
    providedIn: 'root'
})
export class Web3Service {

    private web3: Web3;
    private contract: Contract;
    private contractAddress = "0x6835B8F72EDb1f4a1242C07de236764C95a086Aa";

    constructor(private zone: NgZone) {
        if (window.web3) {
            this.web3 = new Web3(window.ethereum);
            this.contract = new this.web3.eth.Contract(contractAbi, this.contractAddress);

            window.ethereum.enable().catch((err: any) => console.error(err));
        } else {
            console.error("Metamask not installed.");
        }
    }

    async getAccount(): Promise<string> {
        return this.web3.eth.getAccounts().then(accounts => accounts[0] || '');
    }

    async executeTransaction(fnName: string, ...args: any[]): Promise<void> {
        const acc = await this.getAccount();
        return this.contract.methods[fnName](...args).send({ from: acc });
    }

    async call(fnName: string, ...args: any[]): Promise<any> {
        const acc = await this.getAccount();
        try {
            const data = this.contract.methods[fnName](...args).call({ from: acc });
            return Promise.resolve(data);
        } catch(e ) {
            console.error('error in calling ...', fnName);
        }
    }

    onEvents(event:string): Observable<any> {

        return new Observable( (observer) => {
            this.contract.events.allEvents().on('data', data => {
                console.log("new poll created!")
                this.zone.run( _ => {
                    observer.next({
                        event: data.event,
                        payload: data.returnValues,
                    });
                });
            }).on('error', error => console.error(error));
        });


    }


}

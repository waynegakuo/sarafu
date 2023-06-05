import {Component, inject} from '@angular/core';
import {Transaction} from "../../models/transaction.model";
import {FrequentPayments} from "../../models/frequent-payments.model";
import {GlobalService} from "../../services/core/global/global.service";
import {TransactionsService} from "../../services/transactions/transactions.service";

@Component({
  selector: 'app-user-landing-page',
  templateUrl: './user-landing-page.component.html',
  styleUrls: ['./user-landing-page.component.scss']
})
export class UserLandingPageComponent {

  globalService = inject(GlobalService);
  transactionService = inject(TransactionsService);

  recentTransactions: Transaction[] = [
    {
      name: 'Marvin McKinney',
      reason: 'Shopping',
      amount: '94.00',
      transactionType: 'send',
      time: '8:20pm'
    },
    {
      name: 'Jane Wanjiru',
      reason: 'Food shopping',
      amount: '550.00',
      transactionType: 'send',
      time: '11:08pm'
    },
    {
      name: 'Tim Turner',
      reason: 'Stipend',
      amount: '1500.00',
      transactionType: 'receive',
      time: '9:07am'
    },
    {
      name: 'Nicole Locksmith',
      reason: 'Loan',
      amount: '5700.00',
      transactionType: 'send',
      time: '9:33pm'
    },
  ];


  frequentPayments: FrequentPayments[] = [
    {
      logo: 'assets/svgs/dashboard/mastercard.svg',
      amount: '3,500.00',
      title: 'Month Transfer'
    },
    {
      logo: 'assets/svgs/dashboard/netflix.svg',
      amount: '1,140.00',
      title: 'Netflix Premium'
    },
    {
      logo: 'assets/svgs/dashboard/spotify.svg',
      amount: '350.00',
      title: 'Spotify Music'
    },
  ]

  onSendMoneySubmitted(): void {
    this.transactionService.sendMoney()
      .catch((error): void => {
        this.globalService.showSnackbar(error.message);
      });
  }
}

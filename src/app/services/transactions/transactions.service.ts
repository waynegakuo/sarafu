import {inject, Injectable} from '@angular/core';
import {
  collection,
  doc,
  DocumentData,
  Firestore,
  query,
  setDoc,
  where,
  Query,
  getDocs,
  onSnapshot
} from "@angular/fire/firestore";
import {Auth} from "@angular/fire/auth";
import {FormBuilder, Validators} from "@angular/forms";
import {GlobalService} from "../core/global/global.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {Recipient} from "../../models/recipient.model";

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  formBuilder = inject(FormBuilder);
  currentTime:number = (new Date()).getTime();

  transactionForm = this.formBuilder.group({
    phone_number: [0, [Validators.required]],
    amount: [0, [Validators.required, Validators.min(5)]]
  });

  get numberControl() {
    return this.transactionForm.get('phone_number');
  }

  get amountControl() {
    return this.transactionForm.get('amount');
  }

  constructor(private readonly auth: Auth,
              private firestore: Firestore,
              private globalService: GlobalService,
              private router: Router
  ) {}

  /**
   * This method sends money to the specified recipient's phone number according to the amount.
   * It first checks the database if the recipient's phone number exists and processes the transaction.
   * If the record does not exist, it throws an error informing the user that the recipient phone number provided does
   * not match either of the database's users' phone number.
   */
  async sendMoney(): Promise<void> {
    const transactionID: string = doc(collection(this.firestore, 'transactions')).id;
    const transactionRef = doc(this.firestore, `transactions/${transactionID}`);

    // Get reference to the Firestore collection
    const q = query(collection(this.firestore, 'users'),
      where("phone", "==", this.transactionForm.controls.phone_number.value));

    // Listen to real-time changes
    const querySnapshot = await getDocs(q);

    // Check if the record exists, process transaction, throw error if otherwise
    if (querySnapshot.size !== 0) {
      querySnapshot.forEach((doc) => {

        // Get the transaction details from user
        const data: Recipient = {
          recipient_phone_number: this.transactionForm.controls.phone_number.value,
          amount: this.transactionForm.controls.amount.value,
          recipient_name: doc.data()['displayName'],
          time: this.currentTime
        };

        setDoc(transactionRef, data, {merge: true})
          .then((data: void) => {
            Swal.fire({
              icon: 'success',
              title: 'Transaction Successful',
              text: `You have successfully sent Kshs. ${this.transactionForm.controls.amount.value} to ${doc.data()['displayName']}`,
              customClass: {
                confirmButton: 'sweetAlertButton'
              }
            });
            return this.router.navigate(['../dashboard']);
          })
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Sorry! That phone number is not registered in our system.',
        customClass: {
          confirmButton: 'sweetAlertButton'
        }
      });
    }
  }
}

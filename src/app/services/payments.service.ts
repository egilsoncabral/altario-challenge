import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Payment } from '../models/data-types';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  payments$ = new BehaviorSubject<Payment[]>([])

  constructor() {
  }

  createPayment(new_payment: Payment){
    const updated_payments:Payment[] = [... this.payments$.value] 
    updated_payments.push(new_payment)

    this.payments$.next(updated_payments)

    return true
  }
}

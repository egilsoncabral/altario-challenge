import { Component, OnInit } from '@angular/core';
import { SignatureService } from '../../services/signature.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentsService } from 'src/app/services/payments.service';
import { currencyValidator } from 'src/app/utils/validators';
import { Payment } from 'src/app/models/data-types';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  generator_running$ = this.signatureService.generator_running$
  current_signature$ = this.signatureService.current_signature$

  new_payment_form = new FormGroup({
    payment: new FormControl('',[Validators.required]),
    amount: new FormControl('', [Validators.required, currencyValidator()])
  })

  payments$ = this.paymentsService.payments$
  
  get payment() { return this.new_payment_form.get('payment') }
  get amount() { return this.new_payment_form.get('amount') }


  constructor(public signatureService: SignatureService, public paymentsService: PaymentsService) {
    this.generator_running$.subscribe(is_running => {
      if(is_running){
        this.new_payment_form.enable()
      }else{
        this.new_payment_form.disable()
      }
    })
  }

  onSubmitNewPayment(){
    const new_payment: Payment = {
      name: this.new_payment_form.value.payment,
      amount: this.new_payment_form.value.amount,
      signature: this.current_signature$.value
    }

    return this.paymentsService.createPayment(new_payment)
  }

}

import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { SignatureService } from 'src/app/services/signature.service';
import { map, filter, throttleTime } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { Signature } from 'src/app/models/data-types';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {

  matrix_size = this.signatureService.matrix_size
  generator_interval = this.signatureService.generator_interval

  generator_running$ = this.signatureService.generator_running$
  generator_timer$ = this.signatureService.generator_timer$
  current_signature$ = this.signatureService.current_signature$

  current_signature: Signature | null = null
  prefered_char: string = ''

  @ViewChild('in_char', { static: true }) input_char_el: ElementRef

  constructor(public signatureService: SignatureService) {
  }

  ngOnInit() {
    // Destruct the current_signature observable to a normal variable to render in the DOM
    // This avoids the use of the async pipe, and making a new subscrition for every cell of the matrix
    this.current_signature$.subscribe(signature => this.current_signature = signature)

    // Listen to char input
    fromEvent(this.input_char_el.nativeElement, 'keyup').pipe(
      map((event: KeyboardEvent) => event.key), // Get the key pressed
      map(key => key.toUpperCase()), // To uppercase
      filter(key => this.signatureService.alpha_chars.includes(key)), // Only accept if key is an alpha char 
      throttleTime(4000), // Max a new char every 4s
    ).subscribe(key => this.handlePreferedCharInput(key))
  }

  onToggleGenerator() {
    this.signatureService.setGeneratorRunning(!this.generator_running$.value)
  }

  handlePreferedCharInput(key) {
    this.prefered_char = key
    this.signatureService.setPreferedChar(this.prefered_char)
  }

  range(max: number) {
    return new Array(max).fill(0).map((x, i) => i)
  }

}

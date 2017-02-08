import { Directive, ElementRef, Input, HostListener, Renderer, OnInit, OnDestroy } from '@angular/core';

declare var $: any;



@Directive({ selector: '[ajaxModel]' })

export class AddDirective implements OnInit, OnDestroy{


  model_body: string = `<div class="reveal" id="ajaxModel" data-reveal data-close-on-click="true" data-animation-in="spin-in" data-animation-out="spin-out">
<h1>Whoa, I'm dizzy!</h1>
<p class='lead'>There are many options for animating modals, check out the Motion UI library to see them all</p>
  <button class="close-button" data-close aria-label="Close reveal" type="button">
    <span aria-hidden="true">&times;</span>
  </button>
</div>  
                `;

  @Input() url: string;


  constructor(private el: ElementRef, private renderer: Renderer) {}

  ngOnInit() {

    $('body').append(this.model_body);

  }

  @HostListener('click', ['$event'])
  onClick(e) {
    console.log(e);
    this.openModel();
  }

  openModel(){
    $('#ajaxModel').foundation('open');
  }

  ngOnDestroy(){
    $('#ajaxModel').foundation('destroy');
  }
}

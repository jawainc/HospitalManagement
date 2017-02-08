import { Directive, ElementRef, Input, HostListener, Renderer, OnInit, OnDestroy } from '@angular/core';

var Chart =  require('chart.js/dist/Chart.bundle.min.js');

@Directive({ selector: '[jChart]' })

export class ChartModule implements OnInit, OnDestroy{

  chart: any;

  @Input() type: string;
  @Input() data: any;
  @Input() options: any;

  constructor(private el: ElementRef, private renderer: Renderer) {}
  ngOnInit() {
    this.chart = new Chart(this.el.nativeElement, {
      type: this.type,
      data: this.data,
      options: this.options
    });
  }
  ngOnDestroy(){
    this.chart.destroy();
  }
}

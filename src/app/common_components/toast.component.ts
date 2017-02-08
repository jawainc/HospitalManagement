import {Component, Input, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'toasts',
  templateUrl: './templates/toasts.html'
})


export class Toasts {

  @ViewChild('toast_success') toast_success: ElementRef;
  @ViewChild('toast_error') toast_error: ElementRef;
  @ViewChild('toast_info') toast_info: ElementRef;
  @ViewChild('toast_alert') toast_alert: ElementRef;
  @ViewChild('toast_danger') toast_danger: ElementRef;

  open(type: string, text: string){


    switch (type){
      case "success":
        let toasts = this.toast_success.nativeElement;
        toasts.text = text;
        toasts.open();
        break;
      case "error":
        const toaste = this.toast_error.nativeElement;
        toaste.text = text;
        toaste.open();
        break;
      case "info":
        const toasti = this.toast_info.nativeElement;
        toasti.text = text;
        toasti.open();
        break;
      case "alert":
        const toasta = this.toast_alert.nativeElement;
        toasta.text = text;
        toasta.open();
        break;
      case "danger":
        const toastd = this.toast_danger.nativeElement;
        toastd.text = text;
        toastd.open();
        break;

      default:
        break;
  }




  }

  closeDanger(){
    const toastd = this.toast_danger.nativeElement;
    toastd.toggle();
  }

}

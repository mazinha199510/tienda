import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  c: boolean = true;
  p: boolean = false;
  o: boolean = false;

  cargar(i){
    switch(i){
      case 1:
        this.c = true;
        this.p = false;
        this.o = false;
        break;
      
      case 2:
        this.c = false;
        this.p = true;
        this.o = false;
        break;

      case 3:
        this.c = false;
        this.p = false;
        this.o = true;
        break;

      default:
        this.c = true;
        this.p = false;
        this.o = false;
        break;
    }
  }

}

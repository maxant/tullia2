import { Component } from '@angular/core';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent {
  title = 'Tour of Heroes';
  selectedValues: string[] = ['val1'];

  constructor (private messageService: MessageService) {}

  handleClick(e) {
    console.log(e);
    this.messageService.add({severity:'warning', summary:'Service Message', detail:'Via MessageService: selectedValues: ' + this.selectedValues});
  }
}

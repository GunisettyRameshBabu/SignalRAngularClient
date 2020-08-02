import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {SignalRService} from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SignalRClient';
  canSendMessage: boolean;
  messages = [];
  constructor(private _signalRService: SignalRService){}
  ngOnInit(): void {
    this.subscribeToEvents();
  }

  private subscribeToEvents(): void {  
    // if connection exists it can call of method.  
    this._signalRService.connectionEstablished.subscribe(() => {  
        this.canSendMessage = true;  
    });  
    // finally our service method to call when response received from server event and transfer response to some variable to be shwon on the browser.  
    this._signalRService.messageReceived.subscribe((message: any) => {  
      
      var mes = JSON.parse(JSON.stringify(message));
      var item = JSON.parse(mes.message);
      this.messages.push(item);
    });
  } 
    
}

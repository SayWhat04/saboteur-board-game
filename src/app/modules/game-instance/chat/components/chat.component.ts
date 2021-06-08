import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {ChatService} from '../services/chat.service';
import {AuthService} from '../../../../core/authentication/auth.service';
import {Player} from '../../../../shared/models/player';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() chatId: number;
  chat$: Observable<any>;
  newMsg: string;

  constructor(
    public charService: ChatService,
    public auth: AuthService
  ) {
  }

  ngOnInit() {
    const source = this.charService.getChat(this.chatId);
    this.chat$ = this.charService.joinUsers(source); // .pipe(tap(v => this.scrollBottom(v)));
    this.scrollBottom();
  }

  submitMessage(chatId) {
    if (!this.newMsg) {
      return alert('you need to enter something');
    }
    this.charService.sendMessage(chatId, this.newMsg);
    this.newMsg = '';
    this.scrollBottom();
  }

  trackByCreated(i, msg) {
    return msg.createdAt;
  }

  private scrollBottom() {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 500);
  }
}

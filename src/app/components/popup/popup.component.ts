import { Component, Input, OnInit } from '@angular/core';
import { POPUP_COLOR, Popup } from '../../types/popup';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
  @Input() type: Popup | "" = '';
  @Input() text = '';
  title: string = '';
  color: string = '';

  constructor() {}

  ngOnInit() {
    this.title = this.type.charAt(0).toUpperCase() + this.type.slice(1);

    this.color = POPUP_COLOR[this.type as Popup];
  }
}

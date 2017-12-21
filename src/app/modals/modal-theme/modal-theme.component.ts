import { Component, OnInit } from '@angular/core';
import {ModalService} from '../modal.service';
import {SessionService} from '../../session/session.service';

declare var $: any;

@Component({
  selector: 'app-modal-theme',
  templateUrl: './modal-theme.component.html',
  styleUrls: ['./modal-theme.component.css']
})
export class ModalThemeComponent implements OnInit {

  constructor(public modal: ModalService, public session: SessionService) { }

  ngOnInit() {
    this.modal.openModalTheme.subscribe(data => $('app-modal-theme .modal').modal('show'));
  }

  changeTheme(themeUrl: string) {
    this.session.changeTheme(themeUrl);
  }

}

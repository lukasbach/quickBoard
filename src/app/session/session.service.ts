import {EventEmitter, Injectable, Output} from '@angular/core';
import {ProjectdataService} from '../projectdata/projectdata.service';
import {Session} from './session.model';

declare var $: any;

@Injectable()
export class SessionService {

  @Output() public sessionChange: EventEmitter<any> = new EventEmitter();

  public session: Session;

  constructor(public project: ProjectdataService) {
    this.session = {
      currentBoard: this.project.getBoards().length > 0 ? this.project.getBoards()[0].id : null,
      showTaskDescriptions: true,
      showAssignedPeople: true,
      showSubtasks: true,
      showTaskControls: true,
      theme: '',
      isDark: false,
      user: {id: '-1', name: 'Logged user name', email: 'current@user.com'}
    }
  }

  getSession() {
    return this.session;
  }

  getCurrentBoard() {
    if (!this.project.hasBoard(this.session.currentBoard)) {
      this.switchBoard(this.project.getBoards()[0].id);
      this.sessionChange.emit();
    }
    return this.session.currentBoard;
  }

  changeTheme(themeUrl: string) {
    this.session.theme = themeUrl;
    $("#theme").remove();
    $("head").append("<link rel='stylesheet' id='theme' href='"+themeUrl+"' type='text/css' />");
    this.sessionChange.emit();
  }

  switchBoard(boardId: string) {
    this.sessionChange.emit();
    this.session.currentBoard = boardId;
  }
}

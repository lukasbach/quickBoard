import { Component, OnInit } from '@angular/core';
import {ModalService} from '../modals/modal.service';
import {SessionService} from '../session/session.service';
import {Session} from '../session/session.model';
import {Board} from '../projectdata/board.model';
import {ProjectdataService} from '../projectdata/projectdata.service';

@Component({
  selector: 'app-boardcontrols',
  templateUrl: './boardcontrols.component.html',
  styleUrls: ['./boardcontrols.component.css']
})
export class BoardcontrolsComponent implements OnInit {
  sessionReflector: Session;
  boards: Board[];

  constructor(public modal: ModalService, public session: SessionService, public project: ProjectdataService) { }

  ngOnInit() {
    this.sessionReflector = this.session.getSession();
    this.session.sessionChange.subscribe(e => this.sessionReflector = this.session.getSession());

    this.boards = this.project.getBoards();
    this.project.boardMetaChange.subscribe(e => this.boards = this.project.getBoards());
  }

  toggleSessionData(attributeName: string) {
    this.session.getSession()[attributeName] = !this.session.getSession()[attributeName];
    this.session.sessionChange.emit();
  }

  changeBoard(board: Board) {
    this.session.switchBoard(board.id);
  }

  createNewBoard() {
    let text = '<p>Create a new board to store tasks seperately from all other tasks.</p>'
      + '<p>You can then move tasks between the boards and switch the view between the boards from the board menu.</p>'
      + '<p>Enter the name for the new board below.</p>';

    this.modal.getText('Create a new board', text, val => {
      this.project.createBoard({id: null, name: val, categories: [], tasks: []});
    });
  }

  removeCurrentBoard() {
    let board = this.project.getBoard(this.session.getCurrentBoard());
    let this_ = this;

    this.modal.confirm('Delete the current board?', 'Do you really want to create the current board ' + board.name + '?' +
      ' All contained tasks will be removed and can not be restored!', true, val => {

        this_.project.removeBoard(this_.session.getCurrentBoard());
        this_.session.switchBoard(this_.project.getBoards()[0].id);
        this_.session.sessionChange.emit();

    });

    //if (confirm('Do you really want to create the current board ' + board.name + '? All contained tasks will be removed' +
    //    ' and can not be restored!') && confirm('Are you sure? ' + board.tasks.length + ' tasks will be deleted!')) {

    //}
  }

}

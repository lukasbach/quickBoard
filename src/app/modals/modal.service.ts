import {Injectable, Output, EventEmitter} from '@angular/core';

declare var $: any;

@Injectable()
export class ModalService {
  @Output() public openModalEditPerson: EventEmitter<any> = new EventEmitter();
  @Output() public openModalManagePeople: EventEmitter<any> = new EventEmitter();
  @Output() public openModalEditTask: EventEmitter<any> = new EventEmitter();
  @Output() public openModalViewTask: EventEmitter<any> = new EventEmitter();
  @Output() public openModalAcitiviy: EventEmitter<any> = new EventEmitter();
  @Output() public openModalCategoryManagement: EventEmitter<any> = new EventEmitter();
  @Output() public openModalTheme: EventEmitter<any> = new EventEmitter();

  @Output() public openQuickModal: EventEmitter<{
    modalTitle: string,
    modalText: string,
    inputType: string,
    submitClass: string,
    callback?: (string) => void
  }> = new EventEmitter();

  constructor() { }

  public openJQueryModal(modalName: string) {
    $('app-' + modalName + ' .modal').modal('show');
    setTimeout(() => $('body').addClass('modal-open'), 800);
  }

  public alert(title: string, text: string) {
    this.openQuickModal.emit({
      modalTitle: title,
      modalText: text,
      inputType: null,
      submitClass: 'btn-primary'
    });
  }

  public confirm(title: string, text: string, danger: boolean, callback?: (string) => void) {
    this.openQuickModal.emit({
      modalTitle: title,
      modalText: text,
      inputType: null,
      submitClass: danger ? 'btn-danger' : 'btn-primary',
      callback: callback
    });
  }

  public getText(title: string, text: string,  callback?: (string) => void) {
    this.openQuickModal.emit({
      modalTitle: title,
      modalText: text,
      inputType: 'text',
      submitClass: 'btn-primary',
      callback: callback
    });
  }
}

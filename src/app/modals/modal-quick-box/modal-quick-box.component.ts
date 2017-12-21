import {Component, ElementRef, OnInit, Pipe, Sanitizer, ViewChild} from '@angular/core';
import {ModalService} from '../modal.service';

declare var $: any;

@Component({
  selector: 'app-modal-quick-box',
  templateUrl: './modal-quick-box.component.html',
  styleUrls: ['./modal-quick-box.component.css']
})
export class ModalQuickBoxComponent implements OnInit {
  modalTitle: string;
  modalText: string;
  modalSubmitClass: string;
  inputType: string;
  callback?: (string) => void;

  value: any;

  @ViewChild('textContainer') textContainer: ElementRef;

  constructor(public modal: ModalService) { }

  ngOnInit() {
    this.modal.openQuickModal.subscribe(data => {
      this.value = '';
      this.modalTitle = data.modalTitle;
      this.modalText = data.modalText;
      this.modalSubmitClass = data.submitClass;
      this.inputType = data.inputType;
      this.callback = data.callback;
      this.textContainer.nativeElement.innerHTML = this.modalText;
      this.modal.openJQueryModal('modal-quick-box');
    });
  }

  submit() {
    if (this.callback != null) {
      this.callback(this.value);
    }
  }

}
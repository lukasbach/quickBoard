import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalQuickBoxComponent } from './modal-quick-box.component';

describe('ModalQuickBoxComponent', () => {
  let component: ModalQuickBoxComponent;
  let fixture: ComponentFixture<ModalQuickBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalQuickBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalQuickBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

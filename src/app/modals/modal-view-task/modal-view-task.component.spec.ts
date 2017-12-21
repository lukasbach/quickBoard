import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewTaskComponent } from './modal-view-task.component';

describe('ModalViewTaskComponent', () => {
  let component: ModalViewTaskComponent;
  let fixture: ComponentFixture<ModalViewTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalViewTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

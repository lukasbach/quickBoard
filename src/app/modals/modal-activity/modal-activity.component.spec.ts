import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalActivityComponent } from './modal-activity.component';

describe('ModalActivityComponent', () => {
  let component: ModalActivityComponent;
  let fixture: ComponentFixture<ModalActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

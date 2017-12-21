import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalThemeComponent } from './modal-theme.component';

describe('ModalThemeComponent', () => {
  let component: ModalThemeComponent;
  let fixture: ComponentFixture<ModalThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

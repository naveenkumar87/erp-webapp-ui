import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreyinwardCreateComponent } from './greyinward-create.component';

describe('GreyinwardCreateComponent', () => {
  let component: GreyinwardCreateComponent;
  let fixture: ComponentFixture<GreyinwardCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreyinwardCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreyinwardCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

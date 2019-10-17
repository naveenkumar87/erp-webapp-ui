import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreyinwardComponent } from './greyinward.component';

describe('GreyinwardComponent', () => {
  let component: GreyinwardComponent;
  let fixture: ComponentFixture<GreyinwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreyinwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreyinwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

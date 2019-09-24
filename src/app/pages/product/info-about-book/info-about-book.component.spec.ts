import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAboutBookComponent } from './info-about-book.component';

describe('InfoAboutBookComponent', () => {
  let component: InfoAboutBookComponent;
  let fixture: ComponentFixture<InfoAboutBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoAboutBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoAboutBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

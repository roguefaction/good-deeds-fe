import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodDeedsComponent } from './good-deeds.component';

describe('GoodDeedsComponent', () => {
  let component: GoodDeedsComponent;
  let fixture: ComponentFixture<GoodDeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodDeedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodDeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

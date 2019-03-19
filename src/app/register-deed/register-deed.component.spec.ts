import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDeedComponent } from './register-deed.component';

describe('RegisterDeedComponent', () => {
  let component: RegisterDeedComponent;
  let fixture: ComponentFixture<RegisterDeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterDeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

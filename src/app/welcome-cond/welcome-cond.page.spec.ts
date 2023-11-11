import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomeCondPage } from './welcome-cond.page';

describe('WelcomeCondPage', () => {
  let component: WelcomeCondPage;
  let fixture: ComponentFixture<WelcomeCondPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WelcomeCondPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

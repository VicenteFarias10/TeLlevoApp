import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomeCondPage } from './welcome-cond.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../services/api.service';

describe('WelcomeCondPage', () => {
  let component: WelcomeCondPage;
  let fixture: ComponentFixture<WelcomeCondPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeCondPage],
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeCondPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

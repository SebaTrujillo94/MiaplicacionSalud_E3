import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FAQPage } from './faq.page';

describe('FaqPage', () => {
  let component: FAQPage;
  let fixture: ComponentFixture<FAQPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FAQPage]
    }).compileComponents();

    fixture = TestBed.createComponent(FAQPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).not.toBeNull();
    expect(component).not.toBeUndefined();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HomePage } from './home.page';

describe('HomePage - Tests Básicos', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage, IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).not.toBeNull();
    expect(component).not.toBeUndefined();
  });

  it('debería tener un título', () => {
    const title = fixture.nativeElement.querySelector('ion-title');
    expect(title).not.toBeNull();
  });

  it('debería renderizar contenido', () => {
    const content = fixture.nativeElement.textContent;
    expect(content).not.toBeNull();
  });
});

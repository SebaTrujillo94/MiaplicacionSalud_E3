import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HomePage } from './home.page';

describe('HomePage - Tests Básicos', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let modalController: jasmine.SpyObj<ModalController>;

  beforeEach(async () => {
    const modalSpy = jasmine.createSpyObj('ModalController', ['create']);

    await TestBed.configureTestingModule({
      imports: [HomePage, IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: ModalController, useValue: modalSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    modalController = TestBed.inject(ModalController) as jasmine.SpyObj<ModalController>;
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

  // NUEVAS PRUEBAS UNITARIAS ESPECÍFICAS
  describe('🌤️ Weather functionality', () => {
    it('should have weather data properties', () => {
      expect(component.weatherData).toBeDefined();
      expect(component.weatherLoading).toBeDefined();
      expect(component.clima).toBeDefined();
    });

    it('should have weather helper methods', () => {
      expect(component.getWeatherIcon).toBeDefined();
      expect(component.getWeatherColor).toBeDefined();
      expect(component.getCurrentTime).toBeDefined();
      expect(component.getTimeSinceUpdate).toBeDefined();
    });

    it('should return appropriate weather icons', () => {
      // Test sunny weather
      expect(component.getWeatherIcon('01d')).toBe('sunny-outline');
      expect(component.getWeatherIcon('01n')).toBe('moon-outline');
      
      // Test cloudy weather
      expect(component.getWeatherIcon('02d')).toBe('partly-sunny-outline');
      expect(component.getWeatherIcon('03d')).toBe('cloudy-outline');
      
      // Test rainy weather
      expect(component.getWeatherIcon('09d')).toBe('rainy-outline');
      expect(component.getWeatherIcon('10d')).toBe('rainy-outline');
    });

    it('should return appropriate weather colors', () => {
      // Test sunny weather
      expect(component.getWeatherColor('01d')).toBe('warning');
      expect(component.getWeatherColor('01n')).toBe('dark');
      
      // Test cloudy weather
      expect(component.getWeatherColor('02d')).toBe('warning');
      expect(component.getWeatherColor('03d')).toBe('medium');
      
      // Test rainy weather
      expect(component.getWeatherColor('09d')).toBe('primary');
      expect(component.getWeatherColor('10d')).toBe('primary');
    });
  });

  describe('🎨 Theme functionality', () => {
    it('should have isDark property', () => {
      expect(component.isDark).toBeDefined();
      expect(typeof component.isDark).toBe('boolean');
    });

    it('should toggle theme correctly', () => {
      const initialTheme = component.isDark;
      component.toggleTheme();
      expect(component.isDark).toBe(!initialTheme);
    });
  });

  describe('🧭 Navigation functionality', () => {
    it('should have goToPlayStoreForm method', () => {
      expect(component.goToPlayStoreForm).toBeDefined();
      expect(typeof component.goToPlayStoreForm).toBe('function');
    });
  });

  describe('📱 User interface elements', () => {
    it('should display current time', () => {
      const currentTime = component.getCurrentTime();
      expect(currentTime).toBeDefined();
      expect(typeof currentTime).toBe('string');
      expect(currentTime).toMatch(/^\d{2}:\d{2}$/); // HH:MM format
    });

    it('should calculate time since update', () => {
      const timeSince = component.getTimeSinceUpdate();
      expect(timeSince).toBeDefined();
      expect(typeof timeSince).toBe('string');
    });
  });

  describe('📊 Data management', () => {
    it('should handle usuarios array', () => {
      expect(Array.isArray(component.usuarios)).toBeTruthy();
    });

    it('should manage user credentials', () => {
      component.usuario = 'testuser';
      expect(component.usuario).toBe('testuser');
    });
  });
});

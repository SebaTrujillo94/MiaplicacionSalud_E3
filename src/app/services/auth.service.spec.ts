import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { ThemeService } from './theme.service';

describe('StorageService - Pruebas Unitarias MiAppSalud', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService]
    });
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('� Storage operations', () => {
    it('should store and retrieve data correctly', async () => {
      const testKey = 'test_key';
      const testValue = 'test_value';
      
      await service.set(testKey, testValue);
      const retrievedValue = await service.get(testKey);
      
      expect(retrievedValue).toBe(testValue);
    });

    it('should return null for non-existent keys', async () => {
      const result = await service.get('non_existent_key');
      expect(result).toBeNull();
    });

    it('should remove data correctly', async () => {
      const testKey = 'test_key_to_remove';
      const testValue = 'test_value';
      
      await service.set(testKey, testValue);
      await service.remove(testKey);
      
      const result = await service.get(testKey);
      expect(result).toBeNull();
    });

    it('should initialize storage properly', async () => {
      await service.init();
      expect(service).toBeTruthy();
    });
  });
});

describe('ApiService - Pruebas Unitarias MiAppSalud', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('🌐 API calls', () => {
    it('should have getUsers method', () => {
      expect(service.getUsers).toBeDefined();
      expect(typeof service.getUsers).toBe('function');
    });

    it('should have getWeather method', () => {
      expect(service.getWeather).toBeDefined();
      expect(typeof service.getWeather).toBe('function');
    });

    it('should call getUsers and return observable', () => {
      const result = service.getUsers();
      expect(result).toBeDefined();
      expect(typeof result.subscribe).toBe('function');
    });

    it('should call getWeather with city parameter', () => {
      const city = 'Santiago';
      const result = service.getWeather(city);
      expect(result).toBeDefined();
      expect(typeof result.subscribe).toBe('function');
    });
  });
});

describe('ThemeService - Pruebas Unitarias MiAppSalud', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeService]
    });
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('🎨 Theme management', () => {
    it('should have toggleTheme method', () => {
      expect(service.toggleTheme).toBeDefined();
      expect(typeof service.toggleTheme).toBe('function');
    });

    it('should have getCurrentTheme method', () => {
      expect(service.getCurrentTheme).toBeDefined();
      expect(typeof service.getCurrentTheme).toBe('function');
    });

    it('should have setTheme method', () => {
      expect(service.setTheme).toBeDefined();
      expect(typeof service.setTheme).toBe('function');
    });

    it('should handle theme switching', () => {
      // Test initial state
      const initialTheme = service.getCurrentTheme();
      expect(typeof initialTheme).toBe('boolean');
      
      // Test toggle
      service.toggleTheme();
      const newTheme = service.getCurrentTheme();
      expect(newTheme).toBe(!initialTheme);
    });

    it('should set specific theme correctly', () => {
      service.setTheme(true);
      expect(service.getCurrentTheme()).toBe(true);
      
      service.setTheme(false);
      expect(service.getCurrentTheme()).toBe(false);
    });
  });
});

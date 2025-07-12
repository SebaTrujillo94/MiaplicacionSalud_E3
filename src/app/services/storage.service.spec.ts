import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService - Tests Básicos', () => {
  let service: StorageService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [StorageService]
    });
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería tener método init', () => {
    expect(service.init).toBeDefined();
    expect(typeof service.init).toBe('function');
  });

  it('debería tener método get', () => {
    expect(service.get).toBeDefined();
    expect(typeof service.get).toBe('function');
  });

  it('debería tener método set', () => {
    expect(service.set).toBeDefined();
    expect(typeof service.set).toBe('function');
  });

  it('debería tener método remove', () => {
    expect(service.remove).toBeDefined();
    expect(typeof service.remove).toBe('function');
  });
});
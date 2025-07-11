import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/users')
      .pipe(
        catchError(() => of([]))
      );
  }

getWeather(city: string): Observable<any> {
  const apiKey = '5462a7cab8144a4b83272798281fdf29'; // <-- Tu API key real
  const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}&lang=es`;
  return this.http.get(url).pipe(
    catchError(() => of(null))
  );
}
}
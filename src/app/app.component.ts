import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { Observable, of, pipe } from 'rxjs';
import { Airport } from './airport';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Tayir';
  airports : Airport[] = []
  messages : string[] = []
  flightForm: FormGroup

  constructor(private http: HttpClient, public formBuilder: FormBuilder) {
    this.flightForm = this.formBuilder.group({
        departure_airport: '',
        arrival_airport: '',
        departure_date: new Date(),
        arrival_date: new Date(),
    })
  }

  ngOnInit(): void {
    this.log("Fetching airports");
    this.http.get<string>('/assets/airports.csv', {responseType: 'text'}).pipe(catchError(
      (error:any): Observable<string> => {
        this.log("Error while fetching airports: " + error);
        return of("");
      }
    )).subscribe(
      (data: string) => {
        this.airports = data.replace(/\"/g, '').split("\n").map((csvLine: string) => new Airport(csvLine));
        this.messages.push(this.airports.length + " airports fetched");
      }
    )
  }

  private searchPlane(formData): void {
    this.messages.push("TODO: search for a plane for " + formData.departure_date);
  }
  private dateOf(date?: Date): Date {
    if (date != null)
      return new Date(date);
    return new Date();
  }
  private log(message: string): void {
    this.messages.push(message);
  }
}

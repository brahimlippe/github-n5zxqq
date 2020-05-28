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
  private messages : string[] = []
  flightForm: FormGroup

  constructor(private http: HttpClient, public formBuilder: FormBuilder) {
    this.flightForm = this.formBuilder.group({
        departure_airport: '',
        arrival_airport: '',
        departure_date: '',
        arrival_date: '',
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
        this.log(this.airports.length + " airports fetched");
      }
    )
  }

  private searchPlane(formData): void {
    this.log("TODO: test input then search for a plane for " + formData.departure_date
    + " to " + formData.arrival_date + " from " + formData.departure_airport
    + " to " + formData.arrival_airport);
  }
  private today(): Date {
    return new Date();
  }
  private dateOrToday(dateStr: string): Date {
    var date = new Date(dateStr);
    if (date.getFullYear() > 1970)
      return new Date(date);
    return new Date();
  }
  private DateOrTodayPlus(dateStr: string, days: number): Date {
    var date = new Date(dateStr);
    var today = new Date();
    if (date.getFullYear() > 1970)
      return new Date(date);
    var result: Date = new Date();
    result.setDate(result.getDate()+days);
    return result;
  }
  private log(message: string): void {
    this.messages.push(message);
  }
}

export class Airport {
  id: number;
  name: string;
  town: string;
  counrty: string;
  townCode: string;
  airportCode: string;
  constructor(csvLine: string) {
    var linesplit = csvLine.split(',');
    this.id = +linesplit[0];
    this.name = linesplit[1];
    this.town = linesplit[2];
    this.counrty = linesplit[3];
    this.townCode = linesplit[4];
    this.airportCode = linesplit[5];
  }
  matches(pattern: string): boolean {
    pattern = pattern.toUpperCase();
    var joinedString = [this.name, this.town, this.counrty, this.townCode, this.airportCode].join(' ');
    return joinedString.toUpperCase().includes(pattern);
  }
  display(): string {
    return [this.name, this.town, this.counrty].join(', ');
  }
}
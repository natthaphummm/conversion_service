import { Injectable, HttpStatus, HttpException } from '@nestjs/common';

@Injectable()
export class ConvertService {
  private readonly lengthUnits: { [key: string]: number } = {
    km: 1e3,
    m: 1,
    cm: 1e-2,
    mm: 1e-3,
    µm: 1e-6,
    nm: 1e-9,
    mi: 1609.34,
    yd: 0.9144,
    ft: 0.3048,
    in: 0.0254,
    nmi: 1852,
  };

  private readonly weightUnits: { [key: string]: number } = {
    t: 1e6,
    kg: 1e3,
    g: 1,
    mg: 1e-3,
    µg: 1e-6,
    st: 6350.29,
    lb: 453.592,
    oz: 28.3495,
  };

  private temperatureUnits: { [key: string]: number } = {
    c: 1,
    f: 1,
    k: 1,
  };

  convertLength(value: number, from: string, to: string) {
    this.validateUnit(from, this.lengthUnits);
    this.validateUnit(to, this.lengthUnits);
    this.validateValue(value);

    if (from === to) {
      return value;
    }

    return (value * this.lengthUnits[from]) / this.lengthUnits[to];
  }

  convertWeight(value: number, from: string, to: string) {
    this.validateUnit(from, this.weightUnits);
    this.validateUnit(to, this.weightUnits);
    this.validateValue(value);

    if (from === to) {
      return value;
    }

    return (value * this.weightUnits[from]) / this.weightUnits[to];
  }

  temperature(value: number, from: string, to: string) {
    this.validateUnit(from, this.temperatureUnits);
    this.validateUnit(to, this.temperatureUnits);
    this.validateValue(value);

    const celsius = this.convertToCelsius(from, value);

    switch (to) {
      case 'c':
        return celsius;
      case 'f':
        return celsius * 1.8 + 32;
      case 'k':
        return celsius + 273.15;
      default:
        throw new Error('Invalid to unit!');
    }
  }

  private validateUnit(unit: string, units: { [key: string]: number }) {
    if (!units[unit]) {
      throw new HttpException(`Invalid ${unit} unit!`, HttpStatus.BAD_REQUEST);
    }
  }

  private validateValue(value: number) {
    if (!value) {
      throw new HttpException('Invalid value!', HttpStatus.BAD_REQUEST);
    }
  }

  private convertToCelsius(unit: string, value: number) {
    switch (unit) {
      case 'c':
        return value;
      case 'f':
        return (value - 32) / 1.8;
      case 'k':
        return value - 273.15;
      default:
        throw new Error('Invalid from unit!');
    }
  }
}

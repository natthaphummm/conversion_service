import { Test, TestingModule } from '@nestjs/testing';
import { ConvertService } from './convert.service';

describe('ConvertService', () => {
  let service: ConvertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConvertService],
    }).compile();

    service = module.get<ConvertService>(ConvertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const lengthTests = [
    { value: 1, from: 'm', to: 'cm', expected: 100 },
    { value: 1, from: 'cm', to: 'm', expected: 0.01 },
    { value: 1, from: 'km', to: 'm', expected: 1000 },
    { value: 1, from: 'm', to: 'km', expected: 0.001 },
    { value: 1, from: 'mm', to: 'm', expected: 0.001 },
    { value: 1, from: 'µm', to: 'm', expected: 1e-6 },
    { value: 1, from: 'nm', to: 'm', expected: 1e-9 },
    { value: 1, from: 'mi', to: 'm', expected: 1609.34 },
    { value: 1, from: 'yd', to: 'm', expected: 0.9144 },
    { value: 1, from: 'ft', to: 'm', expected: 0.3048 },
    { value: 1, from: 'in', to: 'm', expected: 0.0254 },
    { value: 1, from: 'nmi', to: 'm', expected: 1852 },
  ];

  lengthTests.forEach((test) => {
    it(`should convert ${test.value} ${test.from} to ${test.expected} ${test.to}`, () => {
      expect(service.convertLength(test.value, test.from, test.to)).toEqual(
        test.expected,
      );
    });
  });

  const weightTests = [
    { value: 1, from: 'kg', to: 'g', expected: 1000 },
    { value: 1, from: 'g', to: 'kg', expected: 0.001 },
    { value: 1, from: 't', to: 'kg', expected: 1000 },
    { value: 1, from: 'kg', to: 't', expected: 0.001 },
    { value: 1, from: 'mg', to: 'g', expected: 0.001 },
    { value: 1, from: 'µg', to: 'g', expected: 1e-6 },
    { value: 1, from: 'st', to: 'g', expected: 6350.29 },
    { value: 1, from: 'lb', to: 'g', expected: 453.592 },
    { value: 1, from: 'oz', to: 'g', expected: 28.3495 },
  ];

  weightTests.forEach((test) => {
    it(`should convert ${test.value} ${test.from} to ${test.expected} ${test.to}`, () => {
      expect(service.convertWeight(test.value, test.from, test.to)).toEqual(
        test.expected,
      );
    });
  });

  const temperatureTests = [
    { value: 1, from: 'C', to: 'F', expected: 33.8 },
    { value: 1, from: 'C', to: 'K', expected: 274.15 },
    { value: 1, from: 'F', to: 'C', expected: -17.22222222222222 },
    { value: 1, from: 'F', to: 'K', expected: 255.92777777777775 },
    { value: 1, from: 'K', to: 'C', expected: -272.15 },
    { value: 1, from: 'K', to: 'F', expected: -457.87 },
  ];

  temperatureTests.forEach((test) => {
    it(`should convert ${test.value} ${test.from} to ${test.expected} ${test.to}`, () => {
      expect(service.temperature(test.value, test.from, test.to)).toEqual(
        test.expected,
      );
    });
  });
});

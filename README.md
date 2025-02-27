# Conversion Service

This project is a NestJS-based service for converting various units of measurement, including length, weight, and temperature.

## Description

The Conversion Service provides APIs to convert between different units of length, weight, and temperature. It uses NestJS for building efficient and scalable server-side applications.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Endpoints

### Length Conversion

- **GET** `/convert/length/:value/:from/:to`
  - Converts length from one unit to another.
  - Supported units: `m`, `cm`, `mm`, `km`, `mi`, `yd`, `ft`, `in`, `nmi`

### Weight Conversion

- **GET** `/convert/weight/:value/:from/:to`
  - Converts weight from one unit to another.
  - Supported units: `kg`, `g`, `t`, `mg`, `µg`, `st`, `lb`, `oz`

### Temperature Conversion

- **GET** `/convert/temperature/:value/:from/:to`
  - Converts temperature from one unit to another.
  - Supported units: `c`, `f`, `k`

import { Controller, Get, Param, ParseIntPipe, Inject } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { ConvertService } from './convert.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('convert')
export class ConvertController {
  constructor(
    private readonly convertService: ConvertService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('/length/:value/:from/:to')
  @ApiOperation({ summary: 'Get length conversion' })
  @ApiParam({
    name: 'from',
    enum: ['m', 'cm', 'mm', 'km', 'mi', 'yd', 'ft', 'in', 'nmi'],
  })
  @ApiParam({
    name: 'to',
    enum: ['m', 'cm', 'mm', 'km', 'mi', 'yd', 'ft', 'in', 'nmi'],
  })
  @ApiResponse({
    status: 200,
    description: 'Successful temperature conversion',
    schema: {
      type: 'number',
      example: {
        result: 0.0,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  async convertLength(
    @Param('value', ParseIntPipe) value: number,
    @Param('from') from: string,
    @Param('to') to: string,
  ) {
    let result = await this.cacheManager.get(`${value}${from}${to}`);
    if (result) return result;

    result = this.convertService.convertLength(value, from, to);
    await this.cacheManager.set(`${value}${from}${to}`, result);
    return result;
  }

  @Get('/weight/:value/:from/:to')
  @ApiOperation({ summary: 'Get weight conversion' })
  @ApiParam({
    name: 'from',
    enum: ['kg', 'g', 't', 'mg', 'µg', 'st', 'lb', 'oz'],
  })
  @ApiParam({
    name: 'to',
    enum: ['kg', 'g', 't', 'mg', 'µg', 'st', 'lb', 'oz'],
  })
  @ApiResponse({
    status: 200,
    description: 'Successful temperature conversion',
    schema: {
      type: 'number',
      example: {
        result: 0.0,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  async convertWeight(
    @Param('value', ParseIntPipe) value: number,
    @Param('from') from: string,
    @Param('to') to: string,
  ) {
    let result = await this.cacheManager.get(`${value}${from}${to}`);
    if (result) return result;

    result = this.convertService.convertWeight(value, from, to);
    await this.cacheManager.set(`${value}${from}${to}`, result);
    return result;
  }

  @Get('/temperature/:value/:from/:to')
  @ApiOperation({ summary: 'Get temperature conversion' })
  @ApiParam({
    name: 'from',
    enum: ['c', 'f', 'k'],
  })
  @ApiParam({
    name: 'to',
    enum: ['c', 'f', 'k'],
  })
  @ApiResponse({
    status: 200,
    description: 'Successful temperature conversion',
    schema: {
      type: 'number',
      example: {
        result: 0.0,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  async convertTemperature(
    @Param('value', ParseIntPipe) value: number,
    @Param('from') from: string,
    @Param('to') to: string,
  ) {
    let result = await this.cacheManager.get(`${value}${from}${to}`);
    if (result) return result;

    result = this.convertService.temperature(value, from, to);
    await this.cacheManager.set(`${value}${from}${to}`, result);
    return result;
  }
}

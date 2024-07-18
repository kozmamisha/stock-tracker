import {
  Controller,
  Get,
  Query,
  InternalServerErrorException,
  Param,
} from '@nestjs/common';
import { StockService } from './stock.service';

@Controller('stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get(':ticker/:multiplier/:timespan/:from/:to')
  async getStockData(
    @Param('ticker') ticker: string,
    @Param('multiplier') multiplier: number,
    @Param('timespan') timespan: string,
    @Param('from') from: string,
    @Param('to') to: string,
  ): Promise<any> {
    try {
      const data = await this.stockService.fetchStockData(
        ticker,
        multiplier,
        timespan,
        from,
        to,
      );
      return data;
    } catch (error) {
      console.error('Error fetching stock data:', error);
      throw new InternalServerErrorException('Failed to fetch stock data');
    }
  }
}

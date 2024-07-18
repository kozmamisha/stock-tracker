import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class StockService {
  private readonly BASE_URL = process.env.API_URL;
  private readonly apiKey = process.env.API_KEY;

  async fetchStockData(
    ticker: string,
    multiplier: number,
    timespan: string,
    from: string,
    to: string,
  ): Promise<any> {
    const url = `${this.BASE_URL}/ticker/${ticker}/range/${multiplier}/${timespan}/${from}/${to}?apiKey=${this.apiKey}`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching stock data:', error);
      throw error;
    }
  }
}

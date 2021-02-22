import {
  Controller,
  Get,
  Headers,
  NotAcceptableException,
} from '@nestjs/common';

@Controller('/api/v2/news')
export class NewsController {
  @Get('/')
  async getIndex(@Headers() header): Promise<any> {
    if (!header.api_key) throw new NotAcceptableException();

    return [
      {
        newsTitle: 'Test',
      },
    ];
  }
}

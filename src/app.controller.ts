import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LlmService } from './llm/llm.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly llmService: LlmService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('llm-test')
  async testLlm(): Promise<string> {
    return this.llmService.invoke([
      ['human', 'Привет! Ответь одним коротким предложением, что ты за модель.']
    ]);
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly config: ConfigService) {}

  getHello(): string {
    const model = this.config.get<string>('LLM_MODEL_NAME');
    return `Hello! Model is ${model}`;
  }
}

import { ChatOpenAI } from '@langchain/openai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseMessageLike } from '@langchain/core/messages';

@Injectable()
export class LlmService {
  private readonly chat: ChatOpenAI;

  constructor(private readonly config: ConfigService) {
    this.chat = new ChatOpenAI({
      model: this.config.get<string>('LLM_MODEL_NAME'),
      apiKey: 'sk-noop',
      configuration: {
        baseURL: this.config.get<string>('LLM_BASE_URL')
      },
      temperature: 0.7
    });
  }

  async invoke(messages: BaseMessageLike[]): Promise<string> {
    const response = await this.chat.invoke(messages);

    return response.text;
  }
}

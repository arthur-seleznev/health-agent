import { ChatOpenAI } from '@langchain/openai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseMessageLike } from '@langchain/core/messages';
import z from 'zod';

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

  async invokeStructured<T extends z.ZodType>(
    messages: BaseMessageLike[],
    schema: T
  ): Promise<z.infer<T>> {
    const structured = this.chat.withStructuredOutput(schema);
    return structured.invoke(messages) as Promise<z.infer<T>>;
  }
}

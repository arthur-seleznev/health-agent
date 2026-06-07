import { Injectable } from '@nestjs/common';
import { GraphNode } from '@langchain/langgraph';
import { LlmService } from '../../../infra/llm/llm.service';
import { MenuState } from '../menu.state';
import { MealSchema } from './contracts/menu-suggestion.schema';

@Injectable()
export class MenuSuggestionNode {
  constructor(private readonly llm: LlmService) {}

  run: GraphNode<typeof MenuState> = async (state) => {
    const meal = await this.llm.invokeStructured(
      [
        [
          'system',
          'Ты помощник по питанию. Предложи одно блюдо на запрос и опиши рецепт приготовления.'
        ],
        ['human', state.request]
      ],
      MealSchema
    );
    return { meal };
  };
}

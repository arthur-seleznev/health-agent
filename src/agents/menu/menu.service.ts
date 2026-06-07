import { Injectable, OnModuleInit } from '@nestjs/common';
import { MenuState } from './menu.state';
import { MenuSuggestionNode } from './nodes/menu-suggestion.node';
import { StateGraph, END, START } from '@langchain/langgraph';
import { Meal } from './nodes/contracts/menu-suggestion.schema';

@Injectable()
export class MenuService implements OnModuleInit {
  constructor(private readonly menuSuggestionNode: MenuSuggestionNode) {}

  private buildGraph() {
    return new StateGraph(MenuState)
      .addNode('menu_suggestion', this.menuSuggestionNode.run)
      .addEdge(START, 'menu_suggestion')
      .addEdge('menu_suggestion', END)
      .compile();
  }

  private graph!: ReturnType<typeof this.buildGraph>;

  public onModuleInit() {
    this.graph = this.buildGraph();
  }

  async suggestMeal(request: string): Promise<Meal> {
    const result = await this.graph.invoke({ request });
    if (!result.meal) {
      throw new Error('Граф не вернул блюдо');
    }
    return result.meal;
  }
}

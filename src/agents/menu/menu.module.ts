import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { LlmModule } from '../../infra/llm/llm.module';
import { MenuController } from './menu.controller';
import { MenuSuggestionNode } from './nodes/menu-suggestion.node';

@Module({
  imports: [LlmModule],
  providers: [MenuService, MenuSuggestionNode],
  controllers: [MenuController]
})
export class MenuModule {}

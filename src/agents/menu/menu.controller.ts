import { Body, Controller, Post } from '@nestjs/common';
import { MenuService } from './menu.service';
import { SuggestMenuDto } from './dto/suggest-menu.dto';
import { Meal } from './nodes/contracts/menu-suggestion.schema';

@Controller('menu')
export class MenuController {
  constructor(private readonly menu: MenuService) {}

  @Post('suggest')
  suggest(@Body() dto: SuggestMenuDto): Promise<Meal> {
    return this.menu.suggestMeal(dto.request);
  }
}

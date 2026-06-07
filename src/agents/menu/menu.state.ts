import { StateSchema } from '@langchain/langgraph';
import { z } from 'zod';
import { MealSchema } from './nodes/contracts/menu-suggestion.schema';

export const MenuState = new StateSchema({
  request: z.string(),
  meal: MealSchema.optional()
});

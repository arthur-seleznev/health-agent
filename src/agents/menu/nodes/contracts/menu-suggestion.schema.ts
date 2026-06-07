import z from 'zod';

export const MealSchema = z.object({
  name: z.string().describe('Название блюда'),
  ingredients: z
    .array(
      z.object({
        product: z.string().describe('Название продукта'),
        qty: z.number().describe('Количество продукта'),
        unit: z
          .enum(['g', 'ml', 'piece', 'tbsp', 'tsp', 'pinch'])
          .describe(
            'Единица измерения: g — граммы, ml — миллилитры, piece — штука, tbsp — столовая ложка, tsp — чайная ложка, pinch — щепотка'
          )
      })
    )
    .describe(
      'Список ингредиентов с колчичеством в указанной единице измерения'
    ),
  steps: z.array(z.string()).describe('Список шагов по приготовлению блюда'),
  cookTimeMinutes: z.number().describe('Время приготовления блюда')
});

export type Meal = z.infer<typeof MealSchema>;

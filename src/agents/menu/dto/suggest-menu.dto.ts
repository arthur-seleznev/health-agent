import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const SuggestMenuSchema = z.object({
  request: z.string()
});

export class SuggestMenuDto extends createZodDto(SuggestMenuSchema) {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LlmModule } from './infra/llm/llm.module';
import { MenuModule } from './agents/menu/menu.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), LlmModule, MenuModule],
  controllers: [],
  providers: []
})
export class AppModule {}

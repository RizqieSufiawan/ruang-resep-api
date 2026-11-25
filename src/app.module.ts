import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { RecipesModule } from './recipes/recipes.module.js';

@Module({
  imports: [PrismaModule, RecipesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

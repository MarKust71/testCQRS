import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { CqrsModule, CommandBus } from '@nestjs/cqrs';
import { CreateArticleHandler } from './commands/handlers/create-article.handler';
import { ModuleRef } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'croutedb',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Article]),
    CqrsModule,
  ],
  controllers: [AppController],
  providers: [AppService, CreateArticleHandler],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly commandBus$: CommandBus,
    private readonly moduleRef: ModuleRef,
  ) {}
  onModuleInit() {
    this.commandBus$.setModuleRef(this.moduleRef);
    this.commandBus$.register([CreateArticleHandler]);
  }
}

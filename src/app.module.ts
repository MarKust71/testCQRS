import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { CqrsModule, CommandBus, EventBus } from '@nestjs/cqrs';
import { CreateArticleHandler } from './commands/handlers/create-article.handler';
import { ModuleRef } from '@nestjs/core';
import { EventSaga } from './article.saga';
import { Event } from './event.entity';
import { ArticleRepository } from './article.repository';
import { Catalog } from './catalog.entity';
import { AddIdToCatalogHandler } from './commands/handlers/add-id-to-catalog.handlers';

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
    TypeOrmModule.forFeature([Article, Event, Catalog]),
    CqrsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CreateArticleHandler,
    EventSaga,
    ArticleRepository,
    AddIdToCatalogHandler,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly commandBus$: CommandBus,
    private readonly moduleRef: ModuleRef,
    private readonly eventBus$: EventBus,
    private readonly eventSaga: EventSaga,
  ) {}
  onModuleInit() {
    // this.commandBus$.setModuleRef(this.moduleRef);
    // this.commandBus$.register([CreateArticleHandler]);
  }
}

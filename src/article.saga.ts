import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
// import { ICommand, EventObservable } from '@nestjs/cqrs';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { ArticleCreated } from './events/article-created.event';
import { map } from 'rxjs/operators';
import { Event } from './event.entity';
import { getRepository } from 'typeorm';
import { AddIdToCatalogCommand } from './commands/implementations/add-id-to-catalog.command';

@Injectable()
export class EventSaga {
  @Saga()
  // eventPublished = (events$: EventObservable<any>): Observable<ICommand> => {
  eventPublished = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ArticleCreated),
      map((event) => {
        const storedEvent = new Event();
        storedEvent.payload = event;
        storedEvent.aggregateId = event.aggregateId;
        const { constructor } = Object.getPrototypeOf(event);
        storedEvent.className = constructor.name;
        getRepository(Event).save(storedEvent);
        debugger;
        return null;
      }),
    );
  };

  entityCreated = (event$: Observable<any>): Observable<ICommand> => {
    return event$.pipe(
      ofType(ArticleCreated),
      map((event) => {
        return new AddIdToCatalogCommand('article', event.aggregateId);
      }),
    );
  };
}

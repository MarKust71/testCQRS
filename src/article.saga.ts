import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map } from 'rxjs/operators';
import { ArticleCreated } from './events/article-created.event';
import { Event } from './event.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class EventSaga {
  @Saga()
  eventPublished = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ArticleCreated),
      map(event => {
        const storedEvent = new Event();
        storedEvent.payload = event;
        storedEvent.aggregateId = event.aggregateId;
        const { constructor } = Object.getPrototypeOf(event);
        storedEvent.className = constructor.name;
        getRepository(Event).save(storedEvent);
        return null;
      }),
    );
  };
}
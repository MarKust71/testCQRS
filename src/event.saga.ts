import { Injectable } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { IEvent, ICommand, ofType, Saga } from '@nestjs/cqrs';
import { ArticleCreated } from './events/article-created.event';
import { map } from 'rxjs/operators';
import { Event } from './event.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class EventSaga {
  @Saga()
  eventPublished = (events$: Observable<IEvent>): Observable<ICommand> => {
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

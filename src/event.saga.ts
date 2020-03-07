import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IEvent, ICommand, ofType, Saga } from '@nestjs/cqrs';
import { ArticleCreated } from './events/article-created.event';
import { map } from 'rxjs/operators';

@Injectable()
export class EventSaga {
  @Saga()
  eventPublished = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ArticleCreated),
      map(event => {
        console.log(event);
        return null;
      }),
    );
  };
}

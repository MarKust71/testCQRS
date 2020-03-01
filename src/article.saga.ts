import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map } from 'rxjs/operators';
import { ArticleCreated } from './events/article-created.event';

@Injectable()
export class EventSaga {
  @Saga()
  eventPublished = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ArticleCreated),
      map(event => {
        debugger;
        return null;
      }),
    );
  };
}

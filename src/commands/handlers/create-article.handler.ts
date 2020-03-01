import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateArticleCommand } from '../implementations/create-article.command';
import { Article, createArticle } from '../../article.entity';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler
  implements ICommandHandler<CreateArticleCommand> {
  constructor(private readonly publisher: EventPublisher) {}
  async execute(command: CreateArticleCommand) {
    let article: Article = createArticle(command.articleDto);
    article = this.publisher.mergeObjectContext(article);
    article.commit();
    return article;
  }
}

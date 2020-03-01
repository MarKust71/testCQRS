import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateArticleCommand } from '../implementations/create-article.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article, createArticle } from '../../article.entity';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler
  implements ICommandHandler<CreateArticleCommand> {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly publisher: EventPublisher,
  ) {}
  async execute(command: CreateArticleCommand) {
    let article: Article;

    article = this.articleRepository.create(command.articleDto);
    await this.articleRepository.save(article);

    article = createArticle(command.articleDto);
    article = this.publisher.mergeObjectContext(article);
    article.commit();
    return article;
  }
}

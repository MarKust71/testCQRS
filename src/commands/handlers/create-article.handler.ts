import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateArticleCommand } from '../implementations/create-article.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Article, createArticle } from '../../article.entity';
import { Repository } from 'typeorm';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler
  implements ICommandHandler<CreateArticleCommand> {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly publisher: EventPublisher,
  ) {}
  async execute(command: CreateArticleCommand) {
    // const article = this.articleRepository.create(command.articleDto);
    let article: Article;
    article = createArticle(command.articleDto);
    article = this.publisher.mergeObjectContext(article);
    article.commit();
    await this.articleRepository.save(article);
    return article;
  }
}

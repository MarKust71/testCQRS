// import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CreateArticleCommand } from '../implementations/create-article.command';
// import { Article, createArticle } from '../../article.entity';
import { Article } from '../../article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler
  implements ICommandHandler<CreateArticleCommand> {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>, // private readonly publisher: EventPublisher,
  ) {}
  async execute(command: CreateArticleCommand) {
    // let article: Article = createArticle(command.articleDto);
    // const article: Article = createArticle(command.articleDto);
    const article = await this.articleRepository.create(command.articleDto);
    this.articleRepository.save(article);
    // article = this.publisher.mergeObjectContext(article);
    // article.commit();
    return article;
  }
}

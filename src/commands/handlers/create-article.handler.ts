import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateArticleCommand } from '../implementations/create-article.command';
// import { InjectRepository } from '@nestjs/typeorm';
import { Article, createArticle } from '../../article.entity';
// import { Repository } from 'typeorm';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler
  implements ICommandHandler<CreateArticleCommand> {
  // constructor(
  //   @InjectRepository(Article)
  //   private readonly articleRepository: Repository<Article>,
  //   private readonly publisher: EventPublisher,
  // ) {}
  constructor(private readonly publisher: EventPublisher) {}
  async execute(command: CreateArticleCommand) {
    // const article = this.articleRepository.create(command.articleDto);
    // await this.articleRepository.save(article);
    let article: Article = createArticle(command.articleDto);
    // console.log(article);
    article = this.publisher.mergeObjectContext(article);
    // console.log(article);
    article.commit();
    // console.log(article);
    return article;
  }
}

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
  // async execute(command: CreateArticleCommand, resolve: (value?) => void) {
  async execute(command: CreateArticleCommand) {
    console.log(this.articleRepository);
    // const article = this.articleRepository.create(command.articleDto);
    let article = this.articleRepository.create(command.articleDto);
    // const article: Article = createArticle(command.articleDto);
    // let article: Article = createArticle(command.articleDto);
    article = this.publisher.mergeObjectContext(article);
    article.commit(); // We can also set the autocommit to be true and the apply method will automatically publish them
    //                  @ AADev, I store an event when an article is published
    // resolve(article);
    // console.log(this.articleRepository);
    console.log(this.publisher);
    // await this.articleRepository.save(article);
    return article;
  }
}

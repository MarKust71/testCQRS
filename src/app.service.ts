import { Injectable } from '@nestjs/common';
import { ArticleDTO } from './article.dto';
import { Article } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommandBus } from '@nestjs/cqrs';
import { CreateArticleCommand } from './commands/implementations/create-article.command';
import { ArticleRepository as CustomArticleRepository } from './article.repository';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly commandBus: CommandBus,
    private readonly customArticleRepository: CustomArticleRepository,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  root(): string {
    return 'Hello World!';
  }

  async storeArticle(articleDTO: ArticleDTO): Promise<Article> {
    const createArticleCommand = new CreateArticleCommand(articleDTO);
    // this.commandBus.execute(createArticleCommand);
    // const article = await this.articleRepository.create(articleDTO);
    // await this.articleRepository.save(article);
    // return article;
    return this.commandBus.execute(createArticleCommand);
  }

  async getAllArticles(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  async getArticle(id: string): Promise<Article> {
    // return this.articleRepository.findOne(id);
    return this.customArticleRepository.findById(id);
  }
}

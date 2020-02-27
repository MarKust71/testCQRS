import { Injectable } from '@nestjs/common';
import { ArticleDTO } from './article.dto';
import { Article } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommandBus } from '@nestjs/cqrs';
import { CreateArticleCommand } from './commands/implementations/create-article.command';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly commandBus: CommandBus,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async storeArticle(articleDTO: ArticleDTO): Promise<Article> {
    const createArticleCommand = new CreateArticleCommand(articleDTO);
    this.commandBus.execute(createArticleCommand);
    const article = await this.articleRepository.create(articleDTO);
    await this.articleRepository.save(article);
    return article;
  }

  async getAllArticles(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  async getArticle(id: string): Promise<Article> {
    return this.articleRepository.findOne(id);
  }
}

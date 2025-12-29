import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async createPost(userId: number, content: string): Promise<Post> {
    const post = this.postsRepository.create({
      content,
      user: { id: userId } as any,
    });
    return this.postsRepository.save(post);
  }

  async getPostsByUser(userId: number): Promise<Post[]> {
    return this.postsRepository.find({
      where: { user: { id: userId } as any },
      relations: ['user'],
      order: { id: 'DESC' },
    });
  }

  async getPostById(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async deletePost(id: number, userId: number): Promise<void> {
    const post = await this.getPostById(id);
    if (post.user.id !== userId) {
      throw new UnauthorizedException('You can only delete your own posts');
    }
    await this.postsRepository.remove(post);
  }

  async getAllPosts(): Promise<Post[]> {
    return this.postsRepository.find({
      relations: ['user'],
      order: { id: 'DESC' },
    });
  }
}


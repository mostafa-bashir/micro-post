import { Controller, Post, Body, UseGuards, Get, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @GetUser() user) {
    return this.postsService.createPost(user.userId, createPostDto.content);
  }

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get('user/:userId')
  getUserPosts(@Param('userId', ParseIntPipe) userId: number) {
    return this.postsService.getPostsByUser(userId);
  }

  @Get(':id')
  getPostById(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getPostById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deletePost(@Param('id', ParseIntPipe) id: number, @GetUser() user) {
    return this.postsService.deletePost(id, user.userId);
  }
}
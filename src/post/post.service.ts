import {Injectable, Logger} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Post} from "./entity/post.entity";
import {EntityNotFoundError, Repository} from "typeorm";
import {CreatePostDto} from "./dto/create-post.dto";
import {UpdatePostDto} from "./dto/update-post.dto";


@Injectable()
export class PostService {
    private static readonly logger = new Logger(PostService.name);
    
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>
    ) {
    }

    async create(createPostDto: CreatePostDto): Promise<Post> {
        try {
            const result = await this.postRepository.save(createPostDto);
            PostService.logger.debug(result);
            return result;
        } catch (e) {
            PostService.logger.error(e);
            return e;
        }
    }

    async findAll(): Promise<Post[]> {
        try {
            const posts = await this.postRepository.find();
            PostService.logger.debug(posts);
            return posts;
        } catch (e) {
            PostService.logger.error(e);
            return e;
        }
    }

    async findOne(id: string): Promise<Post> {
        try {
            const post = await this.postRepository.findOne({
                id,
            });
            if(!post) {
                throw new EntityNotFoundError(Post, id);
            }
            PostService.logger.debug(post);
            return post;
        } catch (e) {
            PostService.logger.error(e);
            return e;
        }
    }

    async update(id: string, updatePostDto: UpdatePostDto) {
        try {
            const post = await this.postRepository.findOne({
                id
            });

            if(!post) {
                throw new EntityNotFoundError(Post, id);
            }

            PostService.logger.debug(post);
            const result = await this.postRepository.save({
                ...post,
                ...updatePostDto
            });
            return result;
        } catch (e) {
            PostService.logger.error(e);
            return e;
        }
    }

    async remove(id: string) {
        try {
            const post = await this.postRepository.findOne({
                id,
            });

            if(!post) {
                throw new EntityNotFoundError(Post, id);
            }

            PostService.logger.debug(post);
            await this.postRepository.softDelete({
                id
            });

        } catch (e) {
            PostService.logger.error(e);
            return e;
        }
    }
}
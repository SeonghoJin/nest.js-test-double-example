import {PickType} from "@nestjs/mapped-types";
import {Post} from "../entity/post.entity";

export class CreatePostDto extends PickType(Post, ['contents', 'title'] as const) {

}
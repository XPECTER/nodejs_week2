import { Entity, ManyToOne } from "typeorm";
import { User } from "./user";
import { Post } from "./post";
import { BaseColumn } from "./inheritance";

@Entity()
export class Like extends BaseColumn{
    
    @ManyToOne(type => User, user => user.likes, {onDelete: "CASCADE"})
    user: User;

    @ManyToOne(type => Post, post => post.likes, {onDelete: "CASCADE"})
    post: Post;
}
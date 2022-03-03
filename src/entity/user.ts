import { Entity, Column, OneToMany } from "typeorm";
import { Post } from "./post";
import { Like } from "./like";
import { BaseColumn } from "./inheritance";

@Entity()
export class User extends BaseColumn {

    @Column({ unique: true})
    email: string;

    @Column()
    password: string;

    @Column({ unique: true })
    nickname: string;

    @Column()
    profile_img_url: string;

    @OneToMany(
        type => Post, 
        post => post.user,
        { cascade: true })
    posts: Post[];

    @OneToMany(type => Like, like => like.user)
    likes: Like[];
}

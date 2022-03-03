import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./user";
import { Like } from "./like";
import { BaseColumn } from "./inheritance";

@Entity()
export class Post extends BaseColumn {

    @Column()
    contents: string;

    @Column()
    img_url: string;

    @Column()
    type: number;

    @Column()
    userId: number;

    @ManyToOne(type => User, user => user.posts, {onDelete: 'CASCADE'})
    user: User;

    @OneToMany(type => Like, like => like.post)
    likes: Like[];
}

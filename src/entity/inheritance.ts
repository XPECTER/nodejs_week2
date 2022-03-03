import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseColumn {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
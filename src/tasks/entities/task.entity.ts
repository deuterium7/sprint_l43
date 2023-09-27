import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Comment } from "../../comments/entities/comment.entity";

export enum taskStatusEnum {
    NEW = 'Новая',
    IN_WORK = 'В работе',
    COMPLETED = 'Выполнена',
}

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string

    @Column({
        type: 'enum',
        enum: taskStatusEnum,
        default: taskStatusEnum.NEW
    })
    status: taskStatusEnum

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    public created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    public updated_at: Date;

    @OneToMany(type => Comment, comment => comment.user)
    comments: Comment[]
}

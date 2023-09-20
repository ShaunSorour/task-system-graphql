import { User } from "../../../auth/user/entity/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";


@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({ default: false })
    completed: boolean

    @ManyToOne(type => User, user => user.tasks)
    user: User;
}
import { Task } from '../../../tasks/task/entity/task.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ nullable: false})
    email: string

    @Column()
    password: string

    @OneToMany(type => Task, task => task.user)
    tasks: Task[];
}
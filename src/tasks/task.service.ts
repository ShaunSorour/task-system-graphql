import { Repository } from 'typeorm'
import { CreateTaskInput } from 'src/__generated__/resolvers-types';
import { AppDataSource } from '../auth/user/app-data.source';
import { Task } from './task/entity/task.entity';
import { userService } from '../auth/user/user.service';
import { GraphQLError } from 'graphql';


export class TaskService {
    constructor(
        public taskRepository: Repository<Task>
    ) { }

    async createTask(createTaskInput: CreateTaskInput, id: number) {
        const user = await userService.getUserById(id);
        if (!user) { throw new GraphQLError('User not found'); }

        const task = this.taskRepository.create({ ...createTaskInput })
        task.user = user

        return await this.taskRepository.save(task)
    }

    async getAllTasks() {
        const allTasks = await this.taskRepository.find();

        return allTasks;
    }
}

export const taskService = new TaskService(AppDataSource.getRepository(Task))
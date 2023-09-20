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

    async getTaskById(id: number) {
        const task = await this.taskRepository.createQueryBuilder('task')
            .select('task')
            .addSelect('task.id')
            .select().where('id = :id', { id }).getOne()

        return task
    }

    async getAllTasks() {
        const allTasks = await this.taskRepository.find();

        return allTasks;
    }

    async updateTask(id: number, updatedTitle: string) {
        const existingTask = await taskService.getTaskById(id);
        if (!existingTask) { throw new GraphQLError('Task not found'); }

        if (updatedTitle) {
            existingTask.title = updatedTitle;
        }

        return await this.taskRepository.save(existingTask);
    }

    async deleteTask(id: number) {
        const existingTask = await taskService.getTaskById(id);
        if (!existingTask) { throw new GraphQLError('Task not found'); }

        // remember deleted task
        const deletedTask = { ...existingTask };

        await this.taskRepository.remove(existingTask);

        return deletedTask;
    }
}

export const taskService = new TaskService(AppDataSource.getRepository(Task))
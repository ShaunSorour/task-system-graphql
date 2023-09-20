"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskService = exports.TaskService = void 0;
const app_data_source_1 = require("../auth/user/app-data.source");
const task_entity_1 = require("./task/entity/task.entity");
const user_service_1 = require("../auth/user/user.service");
const graphql_1 = require("graphql");
class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    createTask(createTaskInput, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_service_1.userService.getUserById(id);
            if (!user) {
                throw new graphql_1.GraphQLError('User not found');
            }
            const task = this.taskRepository.create(Object.assign({}, createTaskInput));
            task.user = user;
            return yield this.taskRepository.save(task);
        });
    }
    getUserTasksByCompletionStatus(userId, completed) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryBuilder = this.taskRepository.createQueryBuilder('task');
            queryBuilder.where('task.user = :userId', { userId });
            if (completed !== undefined) {
                queryBuilder.andWhere('task.completed = :completed', { completed });
            }
            const userTasksFilteredByStatus = yield queryBuilder.getMany();
            return userTasksFilteredByStatus;
        });
    }
    getTaskById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.taskRepository.createQueryBuilder('task')
                .select('task')
                .addSelect('task.id')
                .select().where('id = :id', { id }).getOne();
            return task;
        });
    }
    getAllTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            const allTasks = yield this.taskRepository.find();
            return allTasks;
        });
    }
    updateTask(id, updatedTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingTask = yield exports.taskService.getTaskById(id);
            if (!existingTask) {
                throw new graphql_1.GraphQLError('Task not found');
            }
            if (updatedTitle) {
                existingTask.title = updatedTitle;
            }
            return yield this.taskRepository.save(existingTask);
        });
    }
    completeTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingTask = yield exports.taskService.getTaskById(id);
            if (!existingTask) {
                throw new graphql_1.GraphQLError('Task not found');
            }
            existingTask.completed = true;
            return yield this.taskRepository.save(existingTask);
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingTask = yield exports.taskService.getTaskById(id);
            if (!existingTask) {
                throw new graphql_1.GraphQLError('Task not found');
            }
            // remember deleted task
            const deletedTask = Object.assign({}, existingTask);
            yield this.taskRepository.remove(existingTask);
            return deletedTask;
        });
    }
}
exports.TaskService = TaskService;
exports.taskService = new TaskService(app_data_source_1.AppDataSource.getRepository(task_entity_1.Task));

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
exports.taskResolvers = void 0;
const graphql_1 = require("graphql");
const task_service_1 = require("./task.service");
const checkAuthorization = (context) => {
    if (!context.authorized) {
        throw new graphql_1.GraphQLError('Unauthorized', {
            extensions: { code: 'UNAUTHORIZED' }
        });
    }
};
exports.taskResolvers = {
    Mutation: {
        createTask(parent, { input }, context) {
            return __awaiter(this, void 0, void 0, function* () {
                checkAuthorization(context);
                const task = yield task_service_1.taskService.createTask(input, context.currentUser.userId);
                return task;
            });
        },
        updateTask(parent, { input }, context) {
            return __awaiter(this, void 0, void 0, function* () {
                checkAuthorization(context);
                const updatedTask = yield task_service_1.taskService.updateTask(input.taskId, input.updatedTitle);
                return updatedTask;
            });
        },
        deleteTask(parent, { input }, context) {
            return __awaiter(this, void 0, void 0, function* () {
                checkAuthorization(context);
                const deletedTask = yield task_service_1.taskService.deleteTask(input.taskId);
                return deletedTask;
            });
        },
        completeTask(parent, { input }, context) {
            return __awaiter(this, void 0, void 0, function* () {
                checkAuthorization(context);
                const completedTask = yield task_service_1.taskService.completeTask(input.taskId);
                return completedTask;
            });
        }
    },
    Query: {
        allTasks(parent, args, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const allTasks = yield task_service_1.taskService.getAllTasks();
                return allTasks;
            });
        }
    }
};

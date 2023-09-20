import { GraphQLError } from "graphql";
import { Resolvers } from '../__generated__/resolvers-types'
import { taskService } from "./task.service";


interface MyContext {
    authorized: boolean;
}

const checkAuthorization = (context: MyContext) => {
    if (!context.authorized) {
        throw new GraphQLError('Unauthorized', {
            extensions: { code: 'UNAUTHORIZED' }
        });
    }
}

export const taskResolvers: Resolvers = {
    Mutation: {
        async createTask(parent, { input }, context) {
            checkAuthorization(context);
            const task = await taskService.createTask(input, context.currentUser.userId);

            return task;
        },
        async updateTask(parent, { input }, context) {
            checkAuthorization(context);
            const updatedTask = await taskService.updateTask(input.taskId, input.updatedTitle);

            return updatedTask;
        },
        async deleteTask(parent, { input }, context) {
            checkAuthorization(context);
            const deletedTask = await taskService.deleteTask(input.taskId);

            return deletedTask;
        }
    },

    Query: {
        async allTasks(parent, args, context) {
            const allTasks = await taskService.getAllTasks();

            return allTasks;
        }
    }
}

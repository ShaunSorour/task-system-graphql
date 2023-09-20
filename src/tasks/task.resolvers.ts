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
        }
    },

    Query: {
        async allTasks(parent, args, context) {
            const allTasks = await taskService.getAllTasks();

            return allTasks;
        }
    }
}

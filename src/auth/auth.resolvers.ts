import { GraphQLError } from 'graphql'
import { Resolvers } from '../__generated__/resolvers-types'
import { userService } from './user/user.service'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


export const authResolvers: Resolvers = {
    Mutation: {
        async signup(parent, { input }, context) {
            // first check user does not exist
            const existingUser = await userService.getUserByEmail(input.email)

            if (existingUser) throw new GraphQLError('User already exists',
                { extensions: { code: 'BAD_REQUEST' } })

            // then register new user
            const user = await userService.create(input)
            const jwtToken = jwt.sign(
                { email: input.email, userId: user.id },
                process.env.JWT_KEY!,
                { expiresIn: '7 days' }
            )

            return { user, jwt: jwtToken }

        },
        async signin(parent, { input }, context) {
            const user = await userService.getUserByEmail(input.email)

            if (!user) throw new GraphQLError('Incorrect credentials',
                { extensions: { code: 'BAD_REQUEST' } })

            const correctPassword = await bcrypt.compare(input.password, user.password)
            if (!correctPassword) throw new GraphQLError('Incorrect credentials',
                { extensions: { code: 'BAD_REQUEST' } })


            const jwtToken = jwt.sign(
                { email: input.email, userId: user.id },
                process.env.JWT_KEY!,
                { expiresIn: '7 days' })

            return { user, jwt: jwtToken }
        }
    },
    Query: {
        currentUser(parent, { }, context) {
            if (!context.authorized) throw new GraphQLError('Unauthorized',
                { extensions: { code: 'UNAUTHORIZED' } })

            return context.currentUser
        }
    }
}

import { SignupInput } from './../../__generated__/resolvers-types';
import { In, Repository } from 'typeorm'
import { User } from './entity/user.entity'
import bcrypt from 'bcrypt'
import { AppDataSource } from './app-data.source';


export class UserService {
    constructor(public userRepository: Repository<User>) { }

    async create(signupInput: SignupInput) {
        const password = await bcrypt.hash(signupInput.password, 10)
        // update password  - > hash
        const user = this.userRepository.create({ ...signupInput, password })

        return await this.userRepository.save(user)
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.createQueryBuilder('user')
            .select('user')
            .addSelect('user.password')
            .select().where('email = :email', { email }).getOne()

        return user
    }

    async getUserById(id: number) {
        const user = await this.userRepository.createQueryBuilder('user')
            .select('user')
            .addSelect('user.id')
            .select().where('id = :id', { id }).getOne()

        return user
    }
}

export const userService = new UserService(AppDataSource.getRepository(User))
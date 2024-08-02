import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./user.repository";
import { UserDTO } from "./dto/user.dto";
import { userMapper } from "./user.mapper";
import { passwordIsInvalid } from "./validations/passwordValidation";
import { BusinessException } from "../exceptions/BusinessException";
import { emailIsInvalid } from "./validations/emailValidation";
import { CreateUserDTO } from "./dto/create.user.dto";

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async create(user: CreateUserDTO): Promise<UserDTO> {
        if (passwordIsInvalid(user.password)) {
            throw new BusinessException('Error on validate password');
        }
        if (emailIsInvalid(user.email)) {
            throw new BusinessException('Error on validate email');
        }
        const userSaved = await this.usersRepository.create(user.email, user.password);
        return userMapper(userSaved);
    }
}
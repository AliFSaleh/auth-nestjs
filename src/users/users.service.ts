import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
    constructor (
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async create (userDto: CreateUserDto) {       
        const salt = await bcrypt.genSalt();
        userDto.password = await bcrypt.hash(userDto.password, salt) 
        const user =await this.userRepository.save(userDto)
        return user
    }

    async findUser (data: Partial<User>) {
        const user = await this.userRepository.findOneBy({email: data.email})
        if(!user)
            throw new UnauthorizedException('Could not find user')
        return user
    }
}

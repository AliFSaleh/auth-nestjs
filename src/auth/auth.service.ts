import { Injectable, UnauthorizedException } from '@nestjs/common';
import { loginDTO } from './dto/auth-dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async login (data: loginDTO) {
        const user = await this.userService.findUser(data)
        const checkPass = await bcrypt.compare(data.password, user.password)
        
        if(!checkPass)
            throw new UnauthorizedException('Password not match')

        const payload = { email: user.email, sub:user.id }
        const accessToken = this.jwtService.sign(payload)

        return {
            accessToken
        }
    }
}

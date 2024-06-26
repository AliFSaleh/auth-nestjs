import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto';
import { UsersService } from 'src/users/users.service';
import { loginDTO } from './dto';

@Controller('api/auth')
export class AuthController {
    constructor (
        private authService: AuthService,
        private userService: UsersService
    ) {}

    @Post('signup')
    signup (@Body() userDto: CreateUserDto) {
        return this.userService.create(userDto)
    }

    @Post('login')
    login (@Body() loginDto: loginDTO) {
        return this.authService.login(loginDto)
    }
}

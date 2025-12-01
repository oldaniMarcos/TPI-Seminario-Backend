import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from '../public/public.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.register(createUserDto);

    // Remove password before sending response
    const { password, ...safeUser } = user;
    return safeUser;
  }

  @Public()
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.userService.validateUser(
      body.username,
      body.password,
    );

    const { password, ...safeUser } = user;
    return safeUser;
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService['usersRepository'].findOne({
      where: { id: +id },
    });

    if (!user) throw new NotFoundException('User not found');

    const { password, ...safeUser } = user;
    return safeUser;
  }
}

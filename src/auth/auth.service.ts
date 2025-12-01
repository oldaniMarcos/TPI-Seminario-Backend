import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

type AuthInput = { username: string; password: string}
type SignInData = {
  id: number;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async authenticate(input: AuthInput): Promise<{token: string}> {
    const user = await this.validateUser(input)

    return this.signIn(user)
  }

  async validateUser(input: AuthInput): Promise<SignInData> {
    const user = await this.userService.findByUser(input.username)

    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    const isPasswordValid = await bcrypt.compare(input.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect password');
    }

    return {
      id: user.id,
      username: user.username,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
    }
  }

  async signIn(user: SignInData): Promise<{token: string}> {
    const payload = {
      sub: user.id,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }

    const token = await this.jwtService.signAsync(payload)

    return { token }
  }

  // async login(loginDto: LoginDto) {
  //   const { username, password } = loginDto;

  //   const user = await this.userService.validateUser(username, password);

  //   const payload = { sub: user.id, username: user.username };

  //   return {
  //     access_token: this.jwtService.sign(payload),
  //     user: {
  //       id: user.id,
  //       username: user.username,
  //     },
  //   };
  // }
}

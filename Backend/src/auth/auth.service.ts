/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto/register.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      const user = await this.usersService.create({
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
        email: registerDto.email,
        password: registerDto.password,
        role: registerDto.role,
        phone: registerDto.phone || undefined,
      });

      const token = this.generateToken(user);

      return {
        success: true,
        message: 'Inscription réussie',
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || "Erreur lors de l'inscription",
      );
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const isPasswordValid = await this.usersService.validatePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    return user;
  }

  async login(user: User) {
    const token = this.generateToken(user);

    return {
      success: true,
      message: 'Connexion réussie',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  private generateToken(user: User): string {
    return this.jwtService.sign({
      email: user.email,
      sub: user.id,
      role: user.role,
    });
  }
}

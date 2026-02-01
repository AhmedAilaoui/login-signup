/* eslint-disable prettier/prettier */
import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '../../../users/entities/user.entity';
export class RegisterDto {
  @IsString()
  @MinLength(2, { message: 'Le prénom doit contenir au moins 2 caractères' })
  firstName: string;

  @IsString()
  @MinLength(2, { message: 'Le nom doit contenir au moins 2 caractères' })
  lastName: string;

  @IsEmail({}, { message: 'Email invalide' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
  password: string;

  @IsEnum(UserRole, { message: 'Le rôle doit être "client" ou "vendeur"' })
  role: UserRole;

  @IsOptional()
  @IsString()
  phone?: string;
}
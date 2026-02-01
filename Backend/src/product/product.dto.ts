import {
  IsString,
  IsNumber,
  IsOptional,
  Min,
  MinLength,
  IsEnum,
  IsArray,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { ProductCategory, ProductStatus } from './product.entity';

export class CreateProductDto {
  @IsString()
  @MinLength(3, { message: 'Le nom doit contenir au moins 3 caractères' })
  @MaxLength(100, { message: 'Le nom ne peut pas dépasser 100 caractères' })
  name: string;

  @IsString()
  @MinLength(10, {
    message: 'La description doit contenir au moins 10 caractères',
  })
  @MaxLength(2000, {
    message: 'La description ne peut pas dépasser 2000 caractères',
  })
  description: string;

  @IsNumber()
  @Min(0.01, { message: 'Le prix doit être supérieur à 0' })
  price: number;

  @IsNumber()
  @Min(0, { message: 'Le stock ne peut pas être négatif' })
  stock: number;

  @IsEnum(ProductCategory, { message: 'Catégorie invalide' })
  category: ProductCategory;

  @IsOptional()
  @IsEnum(ProductStatus, { message: 'Statut invalide' })
  status?: ProductStatus;

  @IsOptional()
  @IsArray({ message: 'Les images doivent être un tableau' })
  @IsUrl({}, { each: true, message: "Chaque URL d'image doit être valide" })
  images?: string[];

  @IsOptional()
  @IsUrl({}, { message: "L'URL de l'image principale doit être valide" })
  mainImage?: string;
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0.01)
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @IsOptional()
  @IsEnum(ProductCategory)
  category?: ProductCategory;

  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  images?: string[];

  @IsOptional()
  @IsUrl()
  mainImage?: string;
}

export class ProductFilterDto {
  @IsOptional()
  @IsEnum(ProductCategory)
  category?: ProductCategory;

  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumber()
  sellerId?: number;
}

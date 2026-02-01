import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/entities/user.entity';

export enum ProductStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  OUT_OF_STOCK = 'out_of_stock',
}

export enum ProductCategory {
  ELECTRONICS = 'electronics',
  CLOTHING = 'clothing',
  FOOD = 'food',
  BOOKS = 'books',
  HOME = 'home',
  SPORTS = 'sports',
  BEAUTY = 'beauty',
  TOYS = 'toys',
  OTHER = 'other',
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ default: 0 })
  stock: number;

  @Column({
    type: 'enum',
    enum: ProductCategory,
    default: ProductCategory.OTHER,
  })
  category: ProductCategory;

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.ACTIVE,
  })
  status: ProductStatus;

  // Images (stockées sous forme de JSON array)
  @Column({ type: 'json', nullable: true })
  images: string[];

  // Image principale
  @Column({ nullable: true })
  mainImage: string;

  // Relation avec le vendeur
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'sellerId' })
  seller: User;

  @Column()
  sellerId: number;

  // Informations supplémentaires
  @Column({ default: 0 })
  views: number;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  rating: number;

  @Column({ default: 0 })
  reviewsCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

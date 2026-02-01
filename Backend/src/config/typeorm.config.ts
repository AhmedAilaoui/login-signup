import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Product } from '../product/product.entity';

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'nexus_db',
  entities: [User, Product],
  migrations: ['src/migrations/*{.ts,.js}'],
  synchronize: false,
});

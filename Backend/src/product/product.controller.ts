/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  CreateProductDto,
  UpdateProductDto,
  ProductFilterDto,
} from './product.dto';
import { ProductStatus } from './product.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guards';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // ==========================================
  // ROUTES PROTÉGÉES (VENDEUR uniquement) - AVANT @Get(':id')
  // ==========================================

  // GET /api/products/my/products - Récupérer les produits du vendeur connecté (VENDEUR uniquement)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.VENDEUR)
  @Get('my/products')
  async getMyProducts(@Request() req: any) {
    const sellerId = req.user.userId;
    const products = await this.productService.findBySeller(sellerId);

    return {
      success: true,
      data: products,
      total: products.length,
    };
  }

  // GET /api/products/my/stats - Obtenir les statistiques du vendeur (VENDEUR uniquement)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.VENDEUR)
  @Get('my/stats')
  async getMyStats(@Request() req: any) {
    const sellerId = req.user.userId;
    const stats = await this.productService.getSellerStats(sellerId);

    return {
      success: true,
      data: stats,
    };
  }

  // ==========================================
  // ROUTES PUBLIQUES
  // ==========================================

  // GET /api/products - Récupérer tous les produits avec filtres
  @Get()
  async getAllProducts(@Query() filters: ProductFilterDto) {
    const products = await this.productService.findAll(filters);

    return {
      success: true,
      data: products,
      total: products.length,
      filters: filters,
    };
  }

  // GET /api/products/:id - Récupérer un produit par ID
  // ⚠️ CETTE ROUTE DOIT ÊTRE APRÈS les routes "my/products" et "my/stats"
  @Get(':id')
  async getProductById(@Param('id') id: string) {
    const product = await this.productService.findOne(Number(id));

    return {
      success: true,
      data: product,
    };
  }

  // ==========================================
  // AUTRES ROUTES PROTÉGÉES (VENDEUR uniquement)
  // ==========================================

  // POST /api/products - Créer un nouveau produit (VENDEUR uniquement)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.VENDEUR)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Request() req: any,
  ) {
    const sellerId = req.user.userId;
    const product = await this.productService.create(
      createProductDto,
      sellerId,
    );

    return {
      success: true,
      message: 'Produit créé avec succès',
      data: product,
    };
  }

  // PUT /api/products/:id - Mettre à jour un produit (VENDEUR uniquement)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.VENDEUR)
  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Request() req: any,
  ) {
    const userId = req.user.userId;
    const product = await this.productService.update(
      Number(id),
      updateProductDto,
      userId,
    );

    return {
      success: true,
      message: 'Produit mis à jour avec succès',
      data: product,
    };
  }

  // PATCH /api/products/:id/status - Changer le statut d'un produit (VENDEUR uniquement)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.VENDEUR)
  @Patch(':id/status')
  async changeStatus(
    @Param('id') id: string,
    @Body('status') status: ProductStatus,
    @Request() req: any,
  ) {
    const userId = req.user.userId;
    const result = await this.productService.changeStatus(
      Number(id),
      status,
      userId,
    );

    return {
      success: true,
      message: 'Statut mis à jour avec succès',
      data: result,
    };
  }

  // PATCH /api/products/:id/stock - Modifier le stock (VENDEUR uniquement)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.VENDEUR)
  @Patch(':id/stock')
  async updateStock(
    @Param('id') id: string,
    @Body('quantity') quantity: number,
    @Request() req: any,
  ) {
    const userId = req.user.userId;
    const result = await this.productService.updateStock(
      Number(id),
      quantity,
      userId,
    );

    return {
      success: true,
      message: 'Stock mis à jour avec succès',
      data: result,
    };
  }

  // DELETE /api/products/:id - Supprimer un produit (VENDEUR uniquement)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.VENDEUR)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteProduct(@Param('id') id: string, @Request() req: any) {
    const userId = req.user.userId;
    await this.productService.remove(Number(id), userId);

    return {
      success: true,
      message: 'Produit supprimé avec succès',
    };
  }
}

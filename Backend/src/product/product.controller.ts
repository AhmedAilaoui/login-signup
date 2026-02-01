/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, ProductStatus } from './product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
  ProductFilterDto,
} from './product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guards';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('products')
export class ProductController {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  // ==========================================
  // ⚠️ IMPORTANT: LES ROUTES SPÉCIFIQUES DOIVENT ÊTRE AVANT LES ROUTES DYNAMIQUES (:id)
  // ==========================================

  // ==========================================
  // ROUTES PROTÉGÉES (VENDEUR uniquement) - AVANT @Get(':id')
  // ==========================================

  // GET /api/products/my/products - Récupérer les produits du vendeur connecté (VENDEUR uniquement)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.VENDEUR)
  @Get('my/products')
  async getMyProducts(@Request() req: any) {
    const sellerId = req.user.userId;

    const products = await this.productRepository.find({
      where: { sellerId },
      relations: ['seller'],
      order: { createdAt: 'DESC' },
    });

    return {
      success: true,
      data: products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: Number(product.price),
        stock: product.stock,
        category: product.category,
        status: product.status,
        mainImage: product.mainImage,
        images: product.images,
        views: product.views,
        rating: Number(product.rating),
        reviewsCount: product.reviewsCount,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      })),
      total: products.length,
    };
  }

  // GET /api/products/my/stats - Obtenir les statistiques du vendeur (VENDEUR uniquement)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.VENDEUR)
  @Get('my/stats')
  async getMyStats(@Request() req: any) {
    const sellerId = req.user.userId;

    const products = await this.productRepository.find({
      where: { sellerId },
    });

    const stats = {
      totalProducts: products.length,
      activeProducts: products.filter((p) => p.status === ProductStatus.ACTIVE)
        .length,
      inactiveProducts: products.filter(
        (p) => p.status === ProductStatus.INACTIVE,
      ).length,
      outOfStock: products.filter(
        (p) => p.status === ProductStatus.OUT_OF_STOCK,
      ).length,
      totalViews: products.reduce((sum, p) => sum + p.views, 0),
      averageRating:
        products.length > 0
          ? products.reduce((sum, p) => sum + Number(p.rating), 0) /
            products.length
          : 0,
      totalReviews: products.reduce((sum, p) => sum + p.reviewsCount, 0),
    };

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
    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.seller', 'seller');

    // Filtrer par catégorie
    if (filters?.category) {
      query.andWhere('product.category = :category', {
        category: filters.category,
      });
    }

    // Filtrer par statut
    if (filters?.status) {
      query.andWhere('product.status = :status', { status: filters.status });
    } else {
      // Par défaut, afficher seulement les produits actifs
      query.andWhere('product.status = :status', {
        status: ProductStatus.ACTIVE,
      });
    }

    // Filtrer par vendeur
    if (filters?.sellerId) {
      query.andWhere('product.sellerId = :sellerId', {
        sellerId: filters.sellerId,
      });
    }

    // Filtrer par prix
    if (filters?.minPrice !== undefined) {
      query.andWhere('product.price >= :minPrice', {
        minPrice: filters.minPrice,
      });
    }
    if (filters?.maxPrice !== undefined) {
      query.andWhere('product.price <= :maxPrice', {
        maxPrice: filters.maxPrice,
      });
    }

    // Recherche par nom ou description
    if (filters?.search) {
      query.andWhere(
        '(product.name LIKE :search OR product.description LIKE :search)',
        { search: `%${filters.search}%` },
      );
    }

    query.orderBy('product.createdAt', 'DESC');

    const products = await query.getMany();

    return {
      success: true,
      data: products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: Number(product.price),
        stock: product.stock,
        category: product.category,
        status: product.status,
        mainImage: product.mainImage,
        images: product.images,
        seller: {
          id: product.seller.id,
          firstName: product.seller.firstName,
          lastName: product.seller.lastName,
          email: product.seller.email,
        },
        views: product.views,
        rating: Number(product.rating),
        reviewsCount: product.reviewsCount,
        createdAt: product.createdAt,
      })),
      total: products.length,
      filters: filters,
    };
  }

  // GET /api/products/:id - Récupérer un produit par ID
  // ⚠️ CETTE ROUTE DOIT ÊTRE APRÈS les routes "my/products" et "my/stats"
  @Get(':id')
  async getProductById(@Param('id') id: string) {
    const product = await this.productRepository.findOne({
      where: { id: Number(id) },
      relations: ['seller'],
    });

    if (!product) {
      throw new NotFoundException(`Produit avec l'ID ${id} non trouvé`);
    }

    // Incrémenter les vues
    await this.productRepository.increment({ id: Number(id) }, 'views', 1);

    return {
      success: true,
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: Number(product.price),
        stock: product.stock,
        category: product.category,
        status: product.status,
        mainImage: product.mainImage,
        images: product.images,
        seller: {
          id: product.seller.id,
          firstName: product.seller.firstName,
          lastName: product.seller.lastName,
          email: product.seller.email,
        },
        views: product.views,
        rating: Number(product.rating),
        reviewsCount: product.reviewsCount,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
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

    try {
      const product = this.productRepository.create({
        ...createProductDto,
        sellerId,
        status: createProductDto.status || ProductStatus.ACTIVE,
      });

      const savedProduct = await this.productRepository.save(product);

      return {
        success: true,
        message: 'Produit créé avec succès',
        data: {
          id: savedProduct.id,
          name: savedProduct.name,
          description: savedProduct.description,
          price: Number(savedProduct.price),
          stock: savedProduct.stock,
          category: savedProduct.category,
          status: savedProduct.status,
          mainImage: savedProduct.mainImage,
          images: savedProduct.images,
          sellerId: savedProduct.sellerId,
          createdAt: savedProduct.createdAt,
        },
      };
    } catch (error) {
      throw new BadRequestException('Erreur lors de la création du produit');
    }
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

    const product = await this.productRepository.findOne({
      where: { id: Number(id) },
    });

    if (!product) {
      throw new NotFoundException(`Produit avec l'ID ${id} non trouvé`);
    }

    // Vérifier que l'utilisateur est le propriétaire
    if (product.sellerId !== userId) {
      throw new ForbiddenException(
        'Vous ne pouvez modifier que vos propres produits',
      );
    }

    Object.assign(product, updateProductDto);

    // Gérer le statut automatique si stock = 0
    if (updateProductDto.stock !== undefined && updateProductDto.stock === 0) {
      product.status = ProductStatus.OUT_OF_STOCK;
    }

    try {
      const updatedProduct = await this.productRepository.save(product);

      return {
        success: true,
        message: 'Produit mis à jour avec succès',
        data: {
          id: updatedProduct.id,
          name: updatedProduct.name,
          description: updatedProduct.description,
          price: Number(updatedProduct.price),
          stock: updatedProduct.stock,
          category: updatedProduct.category,
          status: updatedProduct.status,
          mainImage: updatedProduct.mainImage,
          images: updatedProduct.images,
          updatedAt: updatedProduct.updatedAt,
        },
      };
    } catch (error) {
      throw new BadRequestException('Erreur lors de la mise à jour du produit');
    }
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

    const product = await this.productRepository.findOne({
      where: { id: Number(id) },
    });

    if (!product) {
      throw new NotFoundException(`Produit avec l'ID ${id} non trouvé`);
    }

    // Vérifier que l'utilisateur est le propriétaire
    if (product.sellerId !== userId) {
      throw new ForbiddenException(
        'Vous ne pouvez modifier que vos propres produits',
      );
    }

    product.status = status;

    const updatedProduct = await this.productRepository.save(product);

    return {
      success: true,
      message: 'Statut mis à jour avec succès',
      data: {
        id: updatedProduct.id,
        status: updatedProduct.status,
      },
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

    const product = await this.productRepository.findOne({
      where: { id: Number(id) },
    });

    if (!product) {
      throw new NotFoundException(`Produit avec l'ID ${id} non trouvé`);
    }

    // Vérifier que l'utilisateur est le propriétaire
    if (product.sellerId !== userId) {
      throw new ForbiddenException(
        'Vous ne pouvez modifier que vos propres produits',
      );
    }

    const newStock = product.stock + quantity;

    if (newStock < 0) {
      throw new BadRequestException('Stock insuffisant');
    }

    product.stock = newStock;

    // Mettre à jour le statut selon le stock
    if (newStock === 0) {
      product.status = ProductStatus.OUT_OF_STOCK;
    } else if (product.status === ProductStatus.OUT_OF_STOCK) {
      product.status = ProductStatus.ACTIVE;
    }

    const updatedProduct = await this.productRepository.save(product);

    return {
      success: true,
      message: 'Stock mis à jour avec succès',
      data: {
        id: updatedProduct.id,
        stock: updatedProduct.stock,
        status: updatedProduct.status,
      },
    };
  }

  // DELETE /api/products/:id - Supprimer un produit (VENDEUR uniquement)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.VENDEUR)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteProduct(@Param('id') id: string, @Request() req: any) {
    const userId = req.user.userId;

    const product = await this.productRepository.findOne({
      where: { id: Number(id) },
    });

    if (!product) {
      throw new NotFoundException(`Produit avec l'ID ${id} non trouvé`);
    }

    // Vérifier que l'utilisateur est le propriétaire
    if (product.sellerId !== userId) {
      throw new ForbiddenException(
        'Vous ne pouvez supprimer que vos propres produits',
      );
    }

    try {
      await this.productRepository.remove(product);

      return {
        success: true,
        message: 'Produit supprimé avec succès',
      };
    } catch (error) {
      throw new BadRequestException('Erreur lors de la suppression du produit');
    }
  }
}

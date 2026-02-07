/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
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

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  /**
   * Récupérer tous les produits avec filtres
   */
  async findAll(filters: ProductFilterDto) {
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

    return products.map((product) => ({
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
    }));
  }

  /**
   * Récupérer un produit par ID
   */
  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['seller'],
    });

    if (!product) {
      throw new NotFoundException(`Produit avec l'ID ${id} non trouvé`);
    }

    // Incrémenter les vues
    await this.productRepository.increment({ id }, 'views', 1);

    return {
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
    };
  }

  /**
   * Récupérer les produits d'un vendeur spécifique
   */
  async findBySeller(sellerId: number) {
    const products = await this.productRepository.find({
      where: { sellerId },
      relations: ['seller'],
      order: { createdAt: 'DESC' },
    });

    return products.map((product) => ({
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
    }));
  }

  /**
   * Obtenir les statistiques d'un vendeur
   */
  async getSellerStats(sellerId: number) {
    const products = await this.productRepository.find({
      where: { sellerId },
    });

    return {
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
  }

  /**
   * Créer un nouveau produit
   */
  async create(createProductDto: CreateProductDto, sellerId: number) {
    try {
      const product = this.productRepository.create({
        ...createProductDto,
        sellerId,
        status: createProductDto.status || ProductStatus.ACTIVE,
      });

      const savedProduct = await this.productRepository.save(product);

      return {
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
      };
    } catch (error) {
      throw new BadRequestException('Erreur lors de la création du produit');
    }
  }

  /**
   * Mettre à jour un produit
   */
  async update(id: number, updateProductDto: UpdateProductDto, userId: number) {
    const product = await this.productRepository.findOne({
      where: { id },
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
      };
    } catch (error) {
      throw new BadRequestException('Erreur lors de la mise à jour du produit');
    }
  }

  /**
   * Changer le statut d'un produit
   */
  async changeStatus(id: number, status: ProductStatus, userId: number) {
    const product = await this.productRepository.findOne({
      where: { id },
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
      id: updatedProduct.id,
      status: updatedProduct.status,
    };
  }

  /**
   * Modifier le stock d'un produit
   */
  async updateStock(id: number, quantity: number, userId: number) {
    const product = await this.productRepository.findOne({
      where: { id },
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
      id: updatedProduct.id,
      stock: updatedProduct.stock,
      status: updatedProduct.status,
    };
  }

  /**
   * Supprimer un produit
   */
  async remove(id: number, userId: number) {
    const product = await this.productRepository.findOne({
      where: { id },
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
      return true;
    } catch (error) {
      throw new BadRequestException('Erreur lors de la suppression du produit');
    }
  }
}

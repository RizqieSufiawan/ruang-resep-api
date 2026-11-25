import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateRecipeDto, UpdateRecipeDto } from './dto/recipe.dto.js';

@Injectable()
export class RecipesService {
  constructor(private readonly prisma: PrismaService) {}

  // Filter opsional: ?category=Makanan&search=nasi
  findAll(category?: string, search?: string) {
    return this.prisma.recipe.findMany({
      where: {
        ...(category && {
          category: { equals: category, mode: 'insensitive' },
        }),
        ...(search && {
          name: { contains: search, mode: 'insensitive' },
        }),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Statistik sederhana: total, rata-rata rating, jumlah per kategori
  async getStats() {
    const [total, average, perCategory] = await Promise.all([
      this.prisma.recipe.count(),
      this.prisma.recipe.aggregate({ _avg: { rating: true } }),
      this.prisma.recipe.groupBy({
        by: ['category'],
        _count: { _all: true },
      }),
    ]);

    return {
      total,
      averageRating: average._avg.rating ?? 0,
      perCategory: perCategory.map((item) => ({
        category: item.category,
        count: item._count._all,
      })),
    };
  }

  async findOne(id: number) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
      include: { comments: true },
    });
    if (!recipe) throw new NotFoundException('Resep tidak ditemukan.');
    return recipe;
  }

  create(dto: CreateRecipeDto) {
    return this.prisma.recipe.create({ data: dto });
  }

  async update(id: number, dto: UpdateRecipeDto) {
    await this.findOne(id);
    return this.prisma.recipe.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.recipe.delete({ where: { id } });
  }
}

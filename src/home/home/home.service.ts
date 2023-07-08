import { Injectable, NotFoundException } from '@nestjs/common';
import { PropertyType } from '@prisma/client';
import { HomeResponseDto } from 'src/home/dtos/home.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

interface getHomesFilterParams {
  city?: string;
  price?: {
    lte?: number;
    gte?: number;
  };
  propertyType?: PropertyType;
}
@Injectable()
export class HomeService {
  constructor(private readonly prismaService: PrismaService) {}

  async getHomes(
    filters: getHomesFilterParams,
    skip: number,
    take: number,
  ): Promise<HomeResponseDto[]> {
    const homes = await this.prismaService.home.findMany({
      include: {
        images: { select: { url: true } },
      },
      where: filters,
      skip,
      take,
    });

    if (!homes) throw new NotFoundException('There is no Homes!');

    return homes.map((home) => new HomeResponseDto(home));
  }

  async getHomeById(id: number): Promise<HomeResponseDto> {
    const home = await this.prismaService.home.findUnique({
      where: { id },
      include: { images: { select: { url: true } } },
    });
    if (!home) throw new NotFoundException('There is no Home with this id !');
    return new HomeResponseDto(home);
  }
}

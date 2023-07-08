import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { PropertyType } from '@prisma/client';
import { HomeService } from './home.service';
import { User } from 'src/auth/decorators/user.decorator';
import { UserInfoAuth } from 'src/auth/interfaces/auth.interface';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}
  @Get()
  getHomes(
    @Query('city') city?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('propertyType') propertyType?: PropertyType,
    @Query(
      'page',
      new ParseIntPipe({
        optional: true,
      }),
    )
    page = 0,
    @Query('pageSize', new ParseIntPipe({ optional: true })) pageSize = 10,
  ) {
    const skip = page || 0;
    const take = pageSize >= 10 ? 10 : pageSize;
    const price =
      minPrice || maxPrice
        ? {
            ...(minPrice && { gte: parseFloat(minPrice) }),
            ...(maxPrice && { lte: parseFloat(maxPrice) }),
          }
        : undefined;

    const filters = {
      ...(city && { city }),
      ...(price && { price }),
      ...(propertyType && { propertyType }),
    };

    return this.homeService.getHomes(filters, skip, take);
  }

  @Get(':id')
  getOneHome(@Param('id', ParseIntPipe) id: number) {
    return this.homeService.getHomeById(id);
  }

  @Post()
  createHome(@Body() body: any, @User() user: UserInfoAuth) {
    return user;
  }
}

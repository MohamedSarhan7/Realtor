import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PropertyType } from '@prisma/client';
import { HomeService } from './home.service';
import { User } from 'src/auth/decorators/user.decorator';
import { UserInfoAuth } from 'src/auth/interfaces/auth.interface';
import { HomeDto } from '../dtos/home.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Home')
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
  createHome(@Body() home: HomeDto, @User() user: UserInfoAuth) {
    return this.homeService.createHome(home, user);
  }

  @Patch(':id')
  updateHome(
    @Param('id', ParseIntPipe) id: number,
    @Body() home: Partial<HomeDto>,
  ) {
    if (Object.keys(home).length === 0) {
      throw new BadRequestException('Request body cannot be empty');
    }
    return this.homeService.partialUpdateHome(id, home);
  }

  @Delete(':id')
  deleteHomeById(@Param('id', ParseIntPipe) id: number) {
    return this.homeService.deleteHome(id);
  }
}

import { Module } from '@nestjs/common';
import { HomeController } from './home/home.controller';
import { HomeService } from './home/home.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}

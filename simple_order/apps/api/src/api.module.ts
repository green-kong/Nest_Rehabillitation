import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ProductModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}

import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Res,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { ProductCreateRequest } from './dto/productCreateRequest';
import { Response } from 'express';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    public async createProduct(
        @Body() request: ProductCreateRequest,
        @Res() response: Response,
    ): Promise<void> {
        const productId = await this.productService.saveProduct(request);
        response.setHeader('Location', `/product/${productId}`).sendStatus(201);
    }

    @Get(':id')
    public async findProductById(@Param('id') id: number) {
        return await this.productService.findProduct(id);
    }
}

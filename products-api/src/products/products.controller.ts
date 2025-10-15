import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { diskStorage, StorageEngine } from 'multer';
import { extname, join } from 'path';
import { existsSync } from 'fs';
import { unlink } from 'fs/promises';
import { Request } from 'express';

import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './service/products.service';

const imageFileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
): void => {
  if (
    !file ||
    !file.originalname ||
    !/\.(jpg|jpeg|png|gif)$/i.test(file.originalname)
  ) {
    return callback(
      new BadRequestException('Apenas arquivos de imagem são permitidos!'),
      false,
    );
  }
  callback(null, true);
};

const storage: StorageEngine = diskStorage({
  destination: './uploads',
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void,
  ): void => {
    try {
      if (!file || !file.originalname) {
        return callback(new Error('Arquivo inválido'), '');
      }

      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const ext = extname(file.originalname);
      const filename = `${uniqueSuffix}${ext}`;
      callback(null, filename);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      callback(error, '');
    }
  },
});

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nome: { type: 'string' },
        descricao: { type: 'string' },
        preco: { type: 'number' },
        categoria: { type: 'string' },
        imagem: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('imagem', {
      storage,
      fileFilter: imageFileFilter,
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  async create(
    @Body() body: any,
    @UploadedFile() imagem?: Express.Multer.File,
  ) {
    let uploadedFilePath: string | null = null;

    try {
      const createProductDto: CreateProductDto = {
        ...body,
        preco: Number(body.preco),
      };

      const imagemPath = imagem?.filename ?? '';
      uploadedFilePath = imagemPath;

      const result = await this.productsService.create(
        createProductDto,
        imagemPath,
      );

      return result;
    } catch (err) {
      if (uploadedFilePath) {
        try {
          const filePath = join(process.cwd(), 'uploads', uploadedFilePath);
          if (existsSync(filePath)) {
            await unlink(filePath);
            console.log(`Arquivo removido após erro: ${uploadedFilePath}`);
          }
        } catch (cleanupError) {
          console.error('Erro ao limpar arquivo:', cleanupError);
        }
      }

      console.error('Erro ao criar produto:', err);
      throw new BadRequestException('Erro ao criar produto');
    }
  }

  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(+id);
  }
}

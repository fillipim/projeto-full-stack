import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { ProductsModule } from './products/products.module';

const uploadsPath = join(process.cwd(), 'uploads');
if (!existsSync(uploadsPath)) {
  mkdirSync(uploadsPath, { recursive: true });
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'produtos_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: uploadsPath,
      serveRoot: '/uploads',
      serveStaticOptions: {
        index: false,
      },
    }),
    ProductsModule,
  ],
})
export class AppModule {}

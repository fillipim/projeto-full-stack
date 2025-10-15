import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  preco: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  categoria: string;
}

import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'PRD-001' })
  @IsString()
  @IsNotEmpty()
  sku!: string;

  @ApiProperty({ example: 'Semen Tiga Roda 50kg' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  brand?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  unitId?: string;

  @ApiPropertyOptional({ example: 50000 })
  @IsNumber()
  @IsOptional()
  hargaBeli?: number;

  @ApiPropertyOptional({ example: 65000 })
  @IsNumber()
  @IsOptional()
  hargaJual?: number;

  @ApiPropertyOptional({ example: 10 })
  @IsInt()
  @IsOptional()
  stokMinimum?: number;

  @ApiPropertyOptional({ enum: ['FIFO', 'AVERAGE', 'STANDARD'], default: 'AVERAGE' })
  @IsEnum(['FIFO', 'AVERAGE', 'STANDARD'])
  @IsOptional()
  costingMethod?: 'FIFO' | 'AVERAGE' | 'STANDARD';
}

export class UpdateStockDto {
  @ApiProperty({ example: 10 })
  @IsNumber()
  @Min(0.0001)
  qty!: number;

  @ApiProperty({ enum: ['in', 'out', 'adjustment', 'transfer'] })
  @IsEnum(['in', 'out', 'adjustment', 'transfer'])
  type!: 'in' | 'out' | 'adjustment' | 'transfer';

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  warehouseId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  referenceId?: string;
}

export class StockTransferDto {
  @ApiProperty()
  @IsUUID()
  productId!: string;

  @ApiProperty()
  @IsUUID()
  fromWarehouseId!: string;

  @ApiProperty()
  @IsUUID()
  toWarehouseId!: string;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @Min(0.0001)
  qty!: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note?: string;
}

import { Type } from 'class-transformer';
import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class POItemDto {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  productId?: string;

  @ApiProperty({ example: 'Semen Tiga Roda 50kg' })
  @IsString()
  @IsNotEmpty()
  nama!: string;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @Min(1)
  qty!: number;

  @ApiProperty({ example: 50000 })
  @IsNumber()
  @Min(0)
  hargaBeli!: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  subtotal?: number;
}

export class CreatePurchaseOrderDto {
  @ApiProperty()
  @IsUUID()
  supplierId!: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  warehouseId?: string;

  @ApiProperty({ example: '2026-01-15' })
  @IsDateString()
  tanggal!: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  tanggalKirim?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note?: string;

  @ApiPropertyOptional({ example: 0 })
  @IsNumber()
  @IsOptional()
  discountPercentage?: number;

  @ApiProperty({ type: [POItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => POItemDto)
  items!: POItemDto[];
}

export class GoodsReceiptItemDto {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  productId?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nama!: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  qtyOrdered!: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  qtyReceived!: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  hargaBeli?: number;
}

export class CreateGoodsReceiptDto {
  @ApiProperty()
  @IsUUID()
  purchaseOrderId!: string;

  @ApiProperty()
  @IsDateString()
  tanggal!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note?: string;

  @ApiProperty({ type: [GoodsReceiptItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GoodsReceiptItemDto)
  items!: GoodsReceiptItemDto[];
}

export class ConfirmGoodsReceiptDto {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  warehouseId?: string;
}

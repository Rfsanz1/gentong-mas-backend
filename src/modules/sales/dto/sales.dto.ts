import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrderItemDto {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  productId?: string;

  @ApiProperty({ example: 'Semen Tiga Roda 50kg' })
  @IsString()
  @IsNotEmpty()
  nama!: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @Min(1)
  qty!: number;

  @ApiProperty({ example: 65000 })
  @IsNumber()
  @Min(0)
  harga!: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  subtotal?: number;
}

export class CreateOrderDto {
  @ApiProperty({ example: 'PT Maju Jaya' })
  @IsString()
  @IsNotEmpty()
  namaCustomer!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  noHp?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  alamat?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  catatan?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  salesName?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  customerId?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  warehouseId?: string;

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items!: OrderItemDto[];

  @ApiPropertyOptional({ example: 130000 })
  @IsNumber()
  @IsOptional()
  totalHarga?: number;
}

export class ConfirmOrderDto {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  warehouseId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note?: string;
}

export class UpdatePengirimanDto {
  @ApiProperty({ enum: ['pending', 'proses', 'dikirim', 'selesai'] })
  @IsString()
  @IsNotEmpty()
  statusPengiriman!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  driverName?: string;
}

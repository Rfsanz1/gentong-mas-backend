import { Controller, Get, Post, Put, Delete, Patch, Param, Body, Query, Inject, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SalesService } from './sales.service.js';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard.js';
import { CanAccessGuard } from '../../core/guards/can-access.guard.js';
import { CanAccess } from '../../core/decorators/can-access.decorator.js';
import { Public } from '../../core/decorators/public.decorator.js';

@ApiTags('sales')
@ApiBearerAuth('JWT')
@Controller('sales')
@UseGuards(JwtAuthGuard, CanAccessGuard)
@CanAccess({ roles: ['Super Admin', 'Owner', 'Admin', 'Sales'] })
export class SalesController {
  constructor(@Inject(SalesService) private readonly svc: SalesService) {}

  @ApiOperation({ summary: 'Ringkasan penjualan' })
  @Get('summary')
  getSummary(@Query() q: any) { return this.svc.getSalesSummary(q); }

  @ApiOperation({ summary: 'Daftar nama sales (dari user DB)' })
  @Get('list')
  getSalesList() { return this.svc.getSalesList(); }

  @ApiOperation({ summary: 'Daftar Order' })
  @Get('orders')
  getOrders(@Query() q: any) { return this.svc.getOrders(q); }

  @ApiOperation({ summary: 'Detail Order' })
  @Get('orders/:id')
  getOrder(@Param('id') id: string) { return this.svc.getOrder(Number(id)); }

  @ApiOperation({ summary: 'Buat Order baru' })
  @Post('orders')
  createOrder(@Body() dto: any) { return this.svc.createOrder(dto); }

  @ApiOperation({ summary: 'Update Order' })
  @Put('orders/:id')
  updateOrder(@Param('id') id: string, @Body() dto: any) { return this.svc.updateOrder(Number(id), dto); }

  @ApiOperation({ summary: 'Batalkan Order' })
  @Delete('orders/:id')
  deleteOrder(@Param('id') id: string) { return this.svc.deleteOrder(Number(id)); }

  @ApiOperation({ summary: 'Update status pengiriman' })
  @Patch('orders/:id/pengiriman')
  updatePengiriman(@Param('id') id: string, @Body() dto: any) { return this.svc.updatePengiriman(Number(id), dto); }

  @ApiOperation({
    summary: 'Konfirmasi pengiriman → StockMovement OUT',
    description: 'Mengkonfirmasi pengiriman order. Memicu StockMovement OUT untuk setiap item. Kirim warehouseId untuk deduct stok.',
  })
  @Post('orders/:id/confirm-delivery')
  confirmDelivery(
    @Param('id') id: string,
    @Body('warehouseId') warehouseId?: string,
    @Body('note') note?: string,
  ) {
    return this.svc.confirmOrderDelivery(Number(id), warehouseId, note);
  }

  @ApiOperation({ summary: 'Upload bukti transfer' })
  @Post('orders/:id/bukti-transfer')
  uploadBukti(@Param('id') id: string, @Body('base64') base64: string) {
    return this.svc.uploadBuktiTransfer(Number(id), base64);
  }

  @ApiOperation({ summary: 'Kirim notifikasi WhatsApp' })
  @Post('orders/:id/whatsapp')
  sendWa(@Param('id') id: string, @Body() dto: any) { return this.svc.sendWhatsAppNotification({ ...dto, id }); }

  @ApiOperation({ summary: 'Daftar Faktur Penjualan' })
  @Get('faktur')
  getSales(@Query() q: any) { return this.svc.getSales(q); }

  @ApiOperation({ summary: 'Lokasi customer (publik via token)' })
  @Public()
  @Get('customer-location/:token')
  getCustomerLoc(@Param('token') token: string) { return this.svc.getCustomerLocation(token); }

  @ApiOperation({ summary: 'Simpan lokasi customer (publik via token)' })
  @Public()
  @Post('customer-location/:token')
  saveCustomerLoc(@Param('token') token: string, @Body() dto: { lat: string; lng: string }) {
    return this.svc.saveCustomerLocation(token, dto.lat, dto.lng);
  }
}

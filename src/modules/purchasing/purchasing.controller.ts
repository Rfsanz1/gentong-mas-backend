import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Query, Inject, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PurchasingService } from './purchasing.service.js';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard.js';
import { CurrentUser } from '../../core/decorators/current-user.decorator.js';

@ApiTags('purchasing')
@ApiBearerAuth('JWT')
@Controller('purchasing')
@UseGuards(JwtAuthGuard)
export class PurchasingController {
  constructor(@Inject(PurchasingService) private readonly svc: PurchasingService) {}

  @ApiOperation({ summary: 'Statistik pembelian' })
  @Get('stats')
  getStats() { return this.svc.getStats(); }

  @ApiOperation({ summary: 'Daftar Purchase Order' })
  @Get('purchase-orders')
  getPOs(@Query() q: any) { return this.svc.getPurchaseOrders(q); }

  @ApiOperation({ summary: 'Detail Purchase Order' })
  @Get('purchase-orders/:id')
  getPO(@Param('id') id: string) { return this.svc.getPurchaseOrder(id); }

  @ApiOperation({ summary: 'Buat Purchase Order baru' })
  @Post('purchase-orders')
  createPO(@Body() dto: any) { return this.svc.createPurchaseOrder(dto); }

  @ApiOperation({ summary: 'Update Purchase Order' })
  @Put('purchase-orders/:id')
  updatePO(@Param('id') id: string, @Body() dto: any) { return this.svc.updatePurchaseOrder(id, dto); }

  @ApiOperation({ summary: 'Approve Purchase Order' })
  @Post('purchase-orders/:id/approve')
  approvePO(@Param('id') id: string, @CurrentUser() user: any) {
    return this.svc.approvePurchaseOrder(id, user?.userId ?? 'system');
  }

  @ApiOperation({ summary: 'Batalkan Purchase Order' })
  @Post('purchase-orders/:id/cancel')
  cancelPO(@Param('id') id: string) { return this.svc.cancelPurchaseOrder(id); }

  @ApiOperation({ summary: 'Ubah status Purchase Order' })
  @Patch('purchase-orders/:id/status')
  changeStatus(@Param('id') id: string, @Body('status') status: string) { return this.svc.changeStatus(id, status); }

  @ApiOperation({ summary: 'Daftar Goods Receipt' })
  @Get('goods-receipts')
  getGRs(@Query() q: any) { return this.svc.getGoodsReceipts(q); }

  @ApiOperation({ summary: 'Buat Goods Receipt baru (status: draft)' })
  @Post('goods-receipts')
  createGR(@Body() dto: any) { return this.svc.createGoodsReceipt(dto); }

  @ApiOperation({
    summary: 'Konfirmasi Goods Receipt → StockMovement IN',
    description: 'Mengkonfirmasi penerimaan barang. Memicu StockMovement IN untuk setiap item. Stok gudang akan bertambah.',
  })
  @Post('goods-receipts/:id/confirm')
  confirmGR(
    @Param('id') id: string,
    @Body('warehouseId') warehouseId?: string,
  ) {
    return this.svc.confirmGoodsReceipt(id, warehouseId);
  }

  @ApiOperation({ summary: 'Daftar Supplier' })
  @Get('suppliers')
  getSuppliers(@Query() q: any) { return this.svc.getSuppliers(q); }

  @ApiOperation({ summary: 'Tambah Supplier' })
  @Post('suppliers')
  createSupplier(@Body() dto: any) { return this.svc.createSupplier(dto); }

  @ApiOperation({ summary: 'Update Supplier' })
  @Put('suppliers/:id')
  updateSupplier(@Param('id') id: string, @Body() dto: any) { return this.svc.updateSupplier(id, dto); }

  @ApiOperation({ summary: 'Nonaktifkan Supplier' })
  @Delete('suppliers/:id')
  deleteSupplier(@Param('id') id: string) { return this.svc.deleteSupplier(id); }
}

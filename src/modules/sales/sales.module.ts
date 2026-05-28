import { Module } from '@nestjs/common';
import { SalesController } from './sales.controller.js';
import { SalesService } from './sales.service.js';
import { PrismaService } from '../../core/prisma/prisma.service.js';
import { KledoModule } from '../../integrations/kledo/kledo.module.js';

@Module({ imports: [KledoModule], controllers: [SalesController], providers: [SalesService, PrismaService], exports: [SalesService] })
export class SalesModule {}

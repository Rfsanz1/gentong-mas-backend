import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service.js';
import { CurrentUser } from '../../../core/decorators/current-user.decorator.js';
import { Public } from '../../../core/decorators/public.decorator.js';
import { JwtAuthGuard } from '../../../core/guards/jwt-auth.guard.js';
import { LoginDto, RefreshTokenDto } from '../dto/auth.dto.js';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login — mendapatkan access & refresh token' })
  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  @ApiOperation({ summary: 'Refresh access token menggunakan refresh token' })
  @Public()
  @Post('refresh')
  async refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto.refreshToken);
  }

  @ApiOperation({ summary: 'Data user yang sedang login' })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@CurrentUser() user: any) {
    return user;
  }
}

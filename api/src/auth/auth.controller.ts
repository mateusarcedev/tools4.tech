import { Controller, Get, Post, UseGuards, Req, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GithubAuthGuard } from './guards/github-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Get('github')
  @UseGuards(GithubAuthGuard)
  @ApiOperation({ summary: 'GitHub OAuth login redirect' })
  githubAuth() {
    // This route will redirect to GitHub
  }

  @Public()
  @Get('github/callback')
  @UseGuards(GithubAuthGuard)
  @ApiOperation({ summary: 'GitHub OAuth callback' })
  async githubAuthCallback(@Req() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('validate-token')
  @ApiOperation({ summary: 'Validate JWT token' })
  validateToken(@Body() body: { token: string }) {
    return this.authService.validateToken(body.token);
  }

  @Public()
  @Post('github-login')
  @ApiOperation({ summary: 'Login with GitHub token from frontend' })
  async githubLogin(@Body() body: { githubId: number, token: string }) {
    // Validate the GitHub token and get user info
    const user = await this.authService.validateGithubToken(body.githubId, body.token);
    if (user) {
      return this.authService.login(user);
    }
    return { error: 'Invalid token or user not found' };
  }

  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  getProfile(@Req() req) {
    return req.user;
  }
}
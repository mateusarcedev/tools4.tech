import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateGithubUser(profile: any): Promise<User> {
    const { id, name, email, avatar_url } = profile;
    
    // Check if user exists
    let user = await this.prisma.user.findUnique({
      where: { githubId: parseInt(id) },
    });

    // If not, create a new user
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          githubId: parseInt(id),
          name: name || 'Unknown',
          email: email || '',
          avatar: avatar_url || '',
        },
      });
    }

    return user;
  }

  async validateGithubToken(githubId: number, token: string): Promise<User | null> {
    try {
      // Verify the token with GitHub API
      const response = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${token}`,
        },
      });

      if (response.data && response.data.id === githubId) {
        // Token is valid, find or create user
        return this.validateGithubUser({
          id: githubId,
          name: response.data.name,
          email: response.data.email,
          avatar_url: response.data.avatar_url,
        });
      }
      return null;
    } catch (error) {
      console.error('Error validating GitHub token:', error);
      return null;
    }
  }

  async login(user: User) {
    const payload = { 
      sub: user.githubId,
      name: user.name,
      email: user.email,
      role: user.role
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      return null;
    }
  }
}
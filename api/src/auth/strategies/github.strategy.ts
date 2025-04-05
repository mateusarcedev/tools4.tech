import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { AuthService } from '../auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ['user:email', 'read:user'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    // Extract relevant profile information
    const profileData = {
      id: profile.id,
      name: profile.displayName || profile.username,
      email: profile.emails && profile.emails[0] ? profile.emails[0].value : null,
      avatar_url: profile.photos && profile.photos[0] ? profile.photos[0].value : null,
    };
    
    const user = await this.authService.validateGithubUser(profileData);
    return user;
  }
}
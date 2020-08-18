import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { extname } from 'path';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

import { Module } from '@nestjs/common';
import { AuthGateway } from './gateway';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [AuthGateway],
})
export class GatewayModule {}

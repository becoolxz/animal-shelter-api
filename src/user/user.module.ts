import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { DatabaseModule } from '../common/provider/database/database.module';
import { usersProviders } from './user.providers';
import { UsersController } from './users.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
})
export class UsersModule {}

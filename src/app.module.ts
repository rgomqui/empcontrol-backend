import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployesModule } from './employes/employees.module';
import { Employee } from './employes/entities/employee.entity';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'), 
        port: configService.get('DATABASE_PORT'), 
        username: configService.get('DATABASE_USERNAME'), 
        password: configService.get('DATABASE_PASSWORD'), 
        database: configService.get('DATABASE_NAME'), 
        entities: [Employee], 
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    EmployesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
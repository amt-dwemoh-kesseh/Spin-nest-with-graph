import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DbConnectModule } from './db-connect/db-connect.module';
import { ErrorFormatter } from './utils/error-formatter';
import { GraphQLError } from 'graphql';
import { AuthenticationsModule } from './authentications/authentications.module';
import { applyMiddleware } from 'graphql-middleware';

import { AuthService } from 'src/utils/jwt.auth';
import { PermissionService } from './authentications/permissions';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async (configService: ConfigService) => {
        // Instantiate AuthService with ConfigService
        const authService = new AuthService(configService);

        // Instantiate PermissionService with AuthService
        const permissionService = new PermissionService(authService);

        return {
          autoSchemaFile: {
            federation: 2,
          },
          playground: false,
          plugins: [ApolloServerPluginLandingPageLocalDefault()],
          formatError: (error: GraphQLError) =>
            new ErrorFormatter().format(error),
          context: ({ req }) => {
            return { req };
          },
          transformSchema: (schema) => {
            return applyMiddleware(schema, permissionService.permissions);
          },
        };
      },
    }),
    UsersModule,
    DbConnectModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthenticationsModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}

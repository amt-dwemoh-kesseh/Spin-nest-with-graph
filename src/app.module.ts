import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DbConnectModule } from './db-connect/db-connect.module';
import { ErrorFormatter } from './utils/error-formatter';
import { GraphQLError } from 'graphql';
import { AuthenticationsModule } from './authentications/authentications.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: {
        federation: 2,
      },
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      formatError: (error: GraphQLError) => new ErrorFormatter().format(error),
    }),
    UsersModule,
    DbConnectModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthenticationsModule,
    PostModule, // Ensure PostModule is imported here
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
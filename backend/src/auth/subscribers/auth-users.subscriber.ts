import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

import { AuthUser } from '../entities';
import { AuthenticationProvider } from '../providers';
import { AuthRole } from '../enums';

@EventSubscriber()
export class AuthUsersSubscriber
  implements EntitySubscriberInterface<AuthUser>
{
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return AuthUser;
  }

  async beforeInsert({ entity }: InsertEvent<AuthUser>): Promise<void> {
    if (entity.password) {
      entity.password = await AuthenticationProvider.generateHash(
        entity.password,
      );
    }

    if (entity.refreshToken) {
      entity.refreshToken = await AuthenticationProvider.generateHash(
        entity.refreshToken,
      );
    }

    if (entity.email) {
      entity.email = entity.email.toLowerCase();
    }

    entity.role = AuthRole.User;
    entity.refreshToken = null;
    entity.active = false;
  }

  async beforeUpdate({
    entity,
    databaseEntity,
  }: UpdateEvent<AuthUser>): Promise<void> {
    if (!entity) return;

    if (entity.password) {
      const password = await AuthenticationProvider.generateHash(
        entity.password,
      );

      if (password !== databaseEntity?.password) {
        entity.password = password;
      }
    }

    if (entity.refreshToken) {
      const refreshToken = await AuthenticationProvider.generateHash(
        entity.refreshToken,
      );

      if (refreshToken !== databaseEntity?.refreshToken) {
        entity.refreshToken = refreshToken;
      }
    }
  }
}

import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

import { AuthToken } from '../entities';
import { AuthenticationProvider } from '../providers';

@EventSubscriber()
export class AuthTokensSubscriber
  implements EntitySubscriberInterface<AuthToken>
{
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return AuthToken;
  }

  async beforeInsert({ entity }: InsertEvent<AuthToken>): Promise<void> {
    if (entity.token) {
      entity.token = await AuthenticationProvider.generateHash(entity.token);
    }
  }

  async beforeUpdate({
    entity,
    databaseEntity,
  }: UpdateEvent<AuthToken>): Promise<void> {
    if (entity && entity.token) {
      const token = await AuthenticationProvider.generateHash(entity.token);

      if (token !== databaseEntity?.token) {
        entity.token = token;
      }
    }
  }
}

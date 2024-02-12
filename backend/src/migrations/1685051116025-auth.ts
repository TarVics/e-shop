import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auth1685051116025 implements MigrationInterface {
  name = 'Auth1685051116025';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`auth_users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`first_name\` varchar(32) NULL, \`last_name\` varchar(32) NULL, \`email\` varchar(128) NOT NULL, \`password\` varchar(128) NOT NULL, \`role\` enum ('user', 'admin', 'super_admin', 'operator') NOT NULL DEFAULT 'user', \`refresh_token\` varchar(255) NULL, \`is_active\` tinyint NOT NULL DEFAULT 0, INDEX \`IDX_6597f3e492f4f8f3cc40772575\` (\`created_at\`), UNIQUE INDEX \`IDX_13d8b49e55a8b06bee6bbc828f\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`auth_tokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` int NOT NULL, \`token\` varchar(255) NULL, \`kind\` enum ('recover', 'register') NOT NULL, \`expires\` datetime NOT NULL, INDEX \`IDX_7cde9db307c82b28a0dda14016\` (\`created_at\`), INDEX \`IDX_9691367d446cd8b18f462c191b\` (\`user_id\`), INDEX \`IDX_80131319007677c0e8f4b776e8\` (\`expires\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`auth_tokens\` ADD CONSTRAINT \`FK_9691367d446cd8b18f462c191b3\` FOREIGN KEY (\`user_id\`) REFERENCES \`auth_users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`auth_tokens\` DROP FOREIGN KEY \`FK_9691367d446cd8b18f462c191b3\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_80131319007677c0e8f4b776e8\` ON \`auth_tokens\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_9691367d446cd8b18f462c191b\` ON \`auth_tokens\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_7cde9db307c82b28a0dda14016\` ON \`auth_tokens\``,
    );
    await queryRunner.query(`DROP TABLE \`auth_tokens\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_13d8b49e55a8b06bee6bbc828f\` ON \`auth_users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_6597f3e492f4f8f3cc40772575\` ON \`auth_users\``,
    );
    await queryRunner.query(`DROP TABLE \`auth_users\``);
  }
}

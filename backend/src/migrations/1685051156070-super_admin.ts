import { MigrationInterface, QueryRunner } from 'typeorm';
import argon2 from '@node-rs/argon2';

export class SuperAdmin1685051156070 implements MigrationInterface {
  private readonly superUserEmail: string = 'super@admin.local';
  private readonly superUserPassword: string = 'superadmin';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const password: string = await argon2.hash(this.superUserPassword);
    await queryRunner.query(
      `INSERT INTO \`auth_users\`(\`id\`, \`email\`, \`password\`, \`role\`, \`is_active\`) VALUES (DEFAULT, ?, ?, ?, ?)`,
      [this.superUserEmail, password, 'super_admin', 1],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM \`auth_users\` WHERE \`email\` = ?`, [
      this.superUserEmail,
    ]);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class Carts1692888313647 implements MigrationInterface {
  name = 'Carts1692888313647';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`carts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uid\` varchar(32) NOT NULL, \`total\` decimal(13,4) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_b4e5008b7138148ed27942e9dc\` (\`created_at\`), UNIQUE INDEX \`IDX_ae6dba8826810695b7b142bebc\` (\`uid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`cart_items\` (\`id\` int NOT NULL AUTO_INCREMENT, \`cart_id\` int NOT NULL, \`product_id\` int NOT NULL, \`price\` decimal(13,4) NOT NULL, \`quantity\` int NOT NULL DEFAULT '0', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_6b5ba7411abc9f3656048d81b3\` (\`created_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart_items\` ADD CONSTRAINT \`FK_6385a745d9e12a89b859bb25623\` FOREIGN KEY (\`cart_id\`) REFERENCES \`carts\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart_items\` ADD CONSTRAINT \`FK_30e89257a105eab7648a35c7fce\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`FK_30e89257a105eab7648a35c7fce\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`FK_6385a745d9e12a89b859bb25623\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_6b5ba7411abc9f3656048d81b3\` ON \`cart_items\``,
    );
    await queryRunner.query(`DROP TABLE \`cart_items\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_ae6dba8826810695b7b142bebc\` ON \`carts\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_b4e5008b7138148ed27942e9dc\` ON \`carts\``,
    );
    await queryRunner.query(`DROP TABLE \`carts\``);
  }
}

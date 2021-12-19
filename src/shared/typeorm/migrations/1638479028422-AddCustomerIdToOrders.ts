import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCustomerIdToOrders1638479028422 implements MigrationInterface {
  name = 'AddCustomerIdToOrders1638479028422';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."orders"  CONSTRAINT "curtomer_id" RENAME TO "customer_id"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."orders" ALTER CONSTRAINT "customer_id" RENAME TO "curtomer_id"`,
    );
  }
}

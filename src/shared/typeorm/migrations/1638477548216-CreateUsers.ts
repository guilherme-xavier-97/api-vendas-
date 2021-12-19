import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUsers1638477548216 implements MigrationInterface {
    name = 'CreateUsers1638477548216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."orders_products" DROP CONSTRAINT "OrdersProductsOrder"`);
        await queryRunner.query(`ALTER TABLE "public"."orders_products" DROP CONSTRAINT "OrdersProductsProduct"`);
        await queryRunner.query(`ALTER TABLE "public"."orders" DROP CONSTRAINT "OrdersCustomer"`);
        await queryRunner.query(`ALTER TABLE "public"."user_tokens" DROP CONSTRAINT "TokenUser"`);
        await queryRunner.query(`ALTER TABLE "public"."orders" DROP CONSTRAINT "UQ_290bc8842ff16ea3be0f1a74c31"`);
        await queryRunner.query(`ALTER TABLE "public"."orders" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "public"."orders" DROP COLUMN "curtomer_id"`);
        await queryRunner.query(`ALTER TABLE "public"."orders" ADD "customerId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."customers" DROP CONSTRAINT "UQ_8536b8b85c06969f84f0c098b03"`);
        await queryRunner.query(`ALTER TABLE "public"."customers" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "public"."customers" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."customers" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "public"."customers" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."orders_products" ALTER COLUMN "order_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."orders_products" ALTER COLUMN "product_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."orders_products" ALTER COLUMN "price" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "public"."orders" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "public"."orders" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."orders" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "public"."orders" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."users" ALTER COLUMN "avatar" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user_tokens" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "public"."user_tokens" ADD "user_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."orders_products" ADD CONSTRAINT "FK_266b0df20b9e4423bc9da1bbdc1" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."orders_products" ADD CONSTRAINT "FK_beb618ce6dae64b9d817394ebdb" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."orders" ADD CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."orders" DROP CONSTRAINT "FK_e5de51ca888d8b1f5ac25799dd1"`);
        await queryRunner.query(`ALTER TABLE "public"."orders_products" DROP CONSTRAINT "FK_beb618ce6dae64b9d817394ebdb"`);
        await queryRunner.query(`ALTER TABLE "public"."orders_products" DROP CONSTRAINT "FK_266b0df20b9e4423bc9da1bbdc1"`);
        await queryRunner.query(`ALTER TABLE "public"."user_tokens" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "public"."user_tokens" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."users" ALTER COLUMN "avatar" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."orders" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "public"."orders" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."orders" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "public"."orders" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."orders_products" ALTER COLUMN "price" TYPE numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "public"."orders_products" ALTER COLUMN "product_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."orders_products" ALTER COLUMN "order_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."customers" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "public"."customers" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."customers" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "public"."customers" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."customers" ADD CONSTRAINT "UQ_8536b8b85c06969f84f0c098b03" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "public"."orders" DROP COLUMN "customerId"`);
        await queryRunner.query(`ALTER TABLE "public"."orders" ADD "curtomer_id" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."orders" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."orders" ADD CONSTRAINT "UQ_290bc8842ff16ea3be0f1a74c31" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "public"."user_tokens" ADD CONSTRAINT "TokenUser" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."orders" ADD CONSTRAINT "OrdersCustomer" FOREIGN KEY ("curtomer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."orders_products" ADD CONSTRAINT "OrdersProductsProduct" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."orders_products" ADD CONSTRAINT "OrdersProductsOrder" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}

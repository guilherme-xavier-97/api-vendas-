/*
  DICA IMPORTANTE PRAS MIGRATIONS:
  -migration: generate serve pra alterar os campos, seria tipo um "alter table"
  depois que vc faz o generate precisa dar o migration:run pra "confirmar" a mudança!

  -precisa colocar -- -n <nome da migration> se nao colocar os "--" nao da certo, a sintaxe é assim
*/
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProducts1632833332641 implements MigrationInterface {
  name = 'CreateProducts1632833332641';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" numeric NOT NULL, "quantity" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "products"`);
  }
}

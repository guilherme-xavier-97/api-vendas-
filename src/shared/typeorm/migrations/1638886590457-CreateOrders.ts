/*
  DICA IMPORTANTE PRAS MIGRATIONS:
  -migration: generate serve pra alterar os campos, seria tipo um "alter table"
  depois que vc faz o generate precisa dar o migration:run pra "confirmar" a mudança!

  -precisa colocar -- -n <nome da migration> se nao colocar os "--" nao da certo, a sintaxe é assim
*/

import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateOrders1638886590457 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'customer_id',
            type: 'uuid',
            /*Why a primary key can be null? Because if a customer is deleted from  customers database,
            your data will continous in orders database, to know who did that order, even if he dont
            exist anymore   */
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        name: 'OrdersCustomer',
        columnNames: ['customer_id'],
        referencedTableName: 'customers',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders', 'OrdersCustomer');
    await queryRunner.dropTable('orders');
  }
}

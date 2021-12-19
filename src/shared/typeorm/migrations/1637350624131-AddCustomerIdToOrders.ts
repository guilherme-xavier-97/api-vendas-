/*
  DICA IMPORTANTE PRAS MIGRATIONS:
  -migration:generate serve pra alterar os campos, seria tipo um "alter table"
  depois que vc faz o generate precisa dar o migration:run pra "confirmar" a mudança!
  Precisa colocar o nome da migrations que vc quer alterar também. A sintaxe seria tipo:
  npm run typeorm migration:generate -- -n <nome da migration>

  -precisa colocar -- -n <nome da migration> se nao colocar os "--" nao da certo, a sintaxe é assim
*/
import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddCustomerIdToOrders1637350624131 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'customer_id',
        type: 'uuid',
        /*Why a primary key can be null? Because if a customer is deleted from  customers database,
        your data will continous in orders database, to know who did that order, even if he dont
        exist anymore   */
        isNullable: true,
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
    await queryRunner.dropColumn('orders', 'customer_id');
  }
}

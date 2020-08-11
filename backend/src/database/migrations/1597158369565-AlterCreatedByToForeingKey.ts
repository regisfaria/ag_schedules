import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterCreatedByToForeingKey1597158369565
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('consults', 'createdBy');
    await queryRunner.addColumn(
      'consults',
      new TableColumn({
        name: 'createdById',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'consults',
      new TableForeignKey({
        name: 'ConsultCreatedBy',
        columnNames: ['createdById'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('consults', 'ConsultCreatedBy');

    await queryRunner.dropColumn('consults', 'createdById');

    await queryRunner.addColumn(
      'consults',
      new TableColumn({
        name: 'createdBy',
        type: 'varchar',
      }),
    );
  }
}

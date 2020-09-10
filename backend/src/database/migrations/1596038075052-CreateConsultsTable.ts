import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateConsultsTable1596038075052
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'consults',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'createdById',
            type: 'uuid',
          },
          {
            name: 'specialistId',
            type: 'uuid',
          },
          {
            name: 'pacientId',
            type: 'uuid',
          },
          {
            name: 'date',
            type: 'date',
          },
          {
            name: 'hour',
            type: 'int',
          },
          {
            name: 'payment',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true,
            default: null,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'consults',
      new TableForeignKey({
        name: 'ConsultCreatedBy',
        columnNames: ['createdById'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'consults',
      new TableForeignKey({
        name: 'SpecialistResponsable',
        columnNames: ['specialistId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'consults',
      new TableForeignKey({
        name: 'PacientConsult',
        columnNames: ['pacientId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pacients',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('consults', 'ConsultCreatedBy');

    await queryRunner.dropForeignKey('consults', 'PacientConsult');

    await queryRunner.dropForeignKey('consults', 'SpecialistResponsable');

    await queryRunner.dropTable('consults');
  }
}

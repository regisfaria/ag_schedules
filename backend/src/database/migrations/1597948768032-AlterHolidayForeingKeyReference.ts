import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterHolidayForeingKeyReference1597948768032
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('holidays', 'scheduleAvailabilityId');

    await queryRunner.addColumn(
      'holidays',
      new TableColumn({
        name: 'specialistId',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'holidays',
      new TableForeignKey({
        name: 'SpecialistHoliday',
        columnNames: ['specialistId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('holidays', 'SpecialistHoliday');

    await queryRunner.dropColumn('holidays', 'specialistId');

    await queryRunner.addColumn(
      'holidays',
      new TableColumn({
        name: 'scheduleAvailabilityId',
        type: 'uuid',
      }),
    );
  }
}

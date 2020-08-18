import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateScheduleAvailabilityTable1596722891712
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'schedules_availability',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'specialistId',
            type: 'uuid',
          },
          {
            name: 'day',
            type: 'int',
          },
          {
            name: 'openTime',
            type: 'int',
          },
          {
            name: 'closeTime',
            type: 'int',
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
            default: 'null',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'schedules_availability',
      new TableForeignKey({
        name: 'UserSchedulesAvailability',
        columnNames: ['specialistId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'schedules_availability',
      'UserSchedulesAvailability',
    );

    await queryRunner.dropTable('schedules_availability');
  }
}

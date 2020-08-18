import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateRestTimeTable1596823630152
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rest_times',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'scheduleAvailabilityId',
            type: 'uuid',
          },
          {
            name: 'startTime',
            type: 'int',
          },
          {
            name: 'endTime',
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
      'rest_times',
      new TableForeignKey({
        name: 'ScheduledRestTime',
        columnNames: ['scheduleAvailabilityId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'schedules_availability',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('rest_times', 'ScheduledRestTime');

    await queryRunner.dropTable('rest_times');
  }
}

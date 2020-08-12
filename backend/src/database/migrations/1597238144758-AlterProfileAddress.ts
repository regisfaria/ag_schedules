import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterProfileAddress1597238144758
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('profiles', 'address');

    await queryRunner.addColumn(
      'profiles',
      new TableColumn({
        name: 'city',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'profiles',
      new TableColumn({
        name: 'state',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'profiles',
      new TableColumn({
        name: 'street',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'profiles',
      new TableColumn({
        name: 'addressNumber',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'profiles',
      new TableColumn({
        name: 'cep',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('profiles', 'cep');
    await queryRunner.dropColumn('profiles', 'addressNumber');
    await queryRunner.dropColumn('profiles', 'street');
    await queryRunner.dropColumn('profiles', 'state');
    await queryRunner.dropColumn('profiles', 'city');

    await queryRunner.addColumn(
      'profiles',
      new TableColumn({
        name: 'address',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }
}

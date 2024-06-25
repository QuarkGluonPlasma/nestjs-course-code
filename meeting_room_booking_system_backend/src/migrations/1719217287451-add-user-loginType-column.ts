import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserLoginTypeColumn1719217287451 implements MigrationInterface {
    name = 'AddUserLoginTypeColumn1719217287451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`loginType\` int NOT NULL COMMENT '登录类型, 0 用户名密码登录, 1 Google 登录, 2 Github 登录' DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`loginType\``);
    }

}

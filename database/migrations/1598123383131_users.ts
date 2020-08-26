import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer("account_id").index()
      table.string('first_name', 25)
      table.string('last_name', 25)
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).nullable()
      table.boolean('owner').defaultTo(false)
      table.string('remember_me_token').nullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

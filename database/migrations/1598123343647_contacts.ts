import BaseSchema from "@ioc:Adonis/Lucid/Schema"

export default class Contacts extends BaseSchema {
  protected tableName = "contacts"

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id")
      table.integer("account_id").index()
      table.integer("organization_id").nullable().index()
      table.string("first_name", 25)
      table.string("last_name", 25)
      table.string("email", 50).nullable()
      table.string("phone", 50).nullable()
      table.string("address", 150).nullable()
      table.string("city", 50).nullable()
      table.string("region", 50).nullable()
      table.string("country", 2).nullable()
      table.string("postal_code", 25).nullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

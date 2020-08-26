import BaseSchema from "@ioc:Adonis/Lucid/Schema"

export default class Accounts extends BaseSchema {
  protected tableName = "accounts"

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id")
      table.string("name", 50)
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

import {DateTime} from "luxon"
import {BaseModel, column} from "@ioc:Adonis/Lucid/Orm"

export default class Contact extends BaseModel {
  @column({isPrimary: true})
  public id: number

  @column()
  public accountId: number

  @column()
  public organizationId?: number

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public email?: string

  @column()
  public phone?: string

  @column()
  public address?: string

  @column()
  public city?: string

  @column()
  public region?: string

  @column()
  public country?: string

  @column()
  public postalCode?: string

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime
}

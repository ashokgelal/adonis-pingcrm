import {DateTime} from 'luxon'
import {BaseModel, column, scope} from '@ioc:Adonis/Lucid/Orm'

export default class Organization extends BaseModel {
  @column({isPrimary: true})
  public id: number

  @column()
  public accountId: number

  @column()
  public name: string

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

  public static filter = scope((query, {search}: { search: any }) => {
    if (search) {
      query.where('name', 'like', `%${search}%`)
    }
  })
}

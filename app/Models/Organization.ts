import {DateTime} from 'luxon'
import {BaseModel, column, hasMany, scope} from '@ioc:Adonis/Lucid/Orm'
import Contact from 'App/Models/Contact'
import {HasMany} from '@ioc:Adonis/Lucid/Relations'

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

  @hasMany(() => Contact)
  public contacts: HasMany<typeof Contact>

  public static filter = scope((query, {search}: { search: any }) => {
    if (search) {
      query.where('name', 'like', `%${search}%`)
    }
  })
}

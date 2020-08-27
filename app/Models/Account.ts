import {DateTime} from 'luxon'
import {BaseModel, column, hasMany} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import {HasMany} from '@ioc:Adonis/Lucid/Relations'
import Organization from 'App/Models/Organization'
import Contact from 'App/Models/Contact'

export default class Account extends BaseModel {
  @column({isPrimary: true})
  public id: number

  @column()
  public name: string

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime

  @hasMany(() => User)
  public users: HasMany<typeof User>

  @hasMany(() => Organization)
  public organizations: HasMany<typeof Organization>

  @hasMany(() => Contact)
  public contacts: HasMany<typeof Contact>
}

export class Profile extends BaseModel {
  @column({isPrimary: true})
  public id: number

  @column()
  public name: string

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime

  @hasMany(() => User)
  public users: HasMany<typeof User>

  @hasMany(() => Organization)
  public organizations: HasMany<typeof Organization>

  @hasMany(() => Contact)
  public contacts: HasMany<typeof Contact>
}

import {DateTime} from 'luxon'
import {BaseModel, belongsTo, column, computed, scope} from '@ioc:Adonis/Lucid/Orm'
import Organization from 'App/Models/Organization'
import {BelongsTo} from '@ioc:Adonis/Lucid/Relations'

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

  @computed()
  public get name () {
    return `${this.firstName} ${this.lastName}`
  }

  public static filter = scope((query, {search}: { search: any }) => {
    if (search) {
      query.where('first_name', 'like', `%${search}%`)
        .orWhere('last_name', 'like', `%${search}%`)
        .orWhere('email', 'like', `%${search}%`)
        .orWhereHas('organization', (q) => {
          q.where('name', 'like', `%${search}%`)
        })
    }
  })

  public static orderByName = scope((query) => {
    query.orderBy('lastName').orderBy('firstName')
  })

  @belongsTo(() => Organization)
  public organization: BelongsTo<typeof Organization>
}

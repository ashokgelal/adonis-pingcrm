import {DateTime} from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {BaseModel, beforeSave, belongsTo, column, computed, scope,} from '@ioc:Adonis/Lucid/Orm'
import Account from 'App/Models/Account';
import {BelongsTo} from '@ioc:Adonis/Lucid/Relations';
import {LucidModel, ModelQueryBuilderContract} from '@ioc:Adonis/Lucid/Model'

export default class User extends BaseModel {
  @column({isPrimary: true})
  public id: number

  @column()
  public accountId: number

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public owner: boolean

  @column()
  public rememberMeToken?: string

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime

  @belongsTo(() => Account)
  public account: BelongsTo<typeof Account>

  @computed()
  public get name() {
    return `${this.firstName} ${this.lastName}`
  }

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  public static role = scope((query, role) => {
    User.applyRoleScope(query, role)
  })

  public static filter = scope((query, {search, role}: { search: any, role: any }) => {
    if (search) {
      query.where('first_name', 'like', `%${search}%`)
        .orWhere('last_name', 'like', `%${search}%`)
        .orWhere('email', 'like', `%${search}%`)
    }
    if (role) {
      User.applyRoleScope(query, role)
    }
  })

  public static orderByName = scope((query) => {
    query.orderBy('lastName').orderBy('firstName')
  })

  private static applyRoleScope (query: ModelQueryBuilderContract<LucidModel>, role: string) {
    switch (role) {
      case 'user':
        query.where('owner', false)
        break
      case 'owner':
        query.where('owner', true)
        break
    }
  }
}

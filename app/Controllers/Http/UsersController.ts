import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {Rule, rules, schema} from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class UsersController {
  public async index ({request, auth, inertia}: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 10
    const user = auth.user!
    await user.preload('account', query => {
      query.preload('users')
    })

    const users = await user.account.related('users')
      .query()
      .apply((scopes) => {
        scopes.filter(request.only(['search', 'role']))
        scopes.orderByName()
      })
      .paginate(page, limit)

    users.baseUrl('/users')

    const links = users.getUrlsForRange(1, users.lastPage)
    const {search, role} = request.all()

    await inertia.render('Users/Index', {
      filters: {search, role},
      users: {links, ...users.toJSON()}
    })
  }

  public async create ({inertia}: HttpContextContract) {
    await inertia.render('Users/Create')
  }

  public async store ({request, response, session, auth}: HttpContextContract) {
    const validated = await request.validate(UsersController.userValidator())
    const user = auth.user
    await user?.preload('account')
    await user?.account.related('users').create(validated)
    session.flash('success', 'User created.')
    response.redirect().back()
  }

  public async edit ({params, inertia}: HttpContextContract) {
    const user = await User.findOrFail(params.user)
    await inertia.render('Users/Edit', {user})
  }

  public async update ({request, response, session, params}: HttpContextContract) {
    console.log('foo')
    const user = await User.findOrFail(params.user)
    const emailRule = rules.unique({table: 'users', column: 'email', whereNot: {id: user.id}})
    const validated = await request.validate(UsersController.userValidator([emailRule]))
    user.firstName = validated.first_name
    user.lastName = validated.last_name
    user.email = validated.email
    user.password = validated.password
    await user.save()
    session.flash('success', 'User updated.')
    response.redirect().back()
  }

  public async destroy ({response, session, params}: HttpContextContract) {
    const organization = await User.findOrFail(params.user)
    await organization.delete()
    session.flash('success', 'User deleted.')
    response.redirect().toRoute('users.index')
  }

  private static userValidator (emailRules: Rule[] = []) {
    return {
      schema: schema.create({
        first_name: schema.string({}, [rules.required(), rules.maxLength(50)]),
        last_name: schema.string({}, [rules.required(), rules.maxLength(50)]),
        email: schema.string({}, [rules.maxLength(50), rules.email(), ...emailRules]),
        password: schema.string(),
        owner: schema.boolean(),
      })
    }
  }
}

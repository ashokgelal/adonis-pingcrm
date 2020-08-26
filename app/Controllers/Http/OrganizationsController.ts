import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Organization from 'App/Models/Organization'
import {rules, schema} from '@ioc:Adonis/Core/Validator'

export default class OrganizationsController {
  public async index ({request, inertia}: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 10
    // fixme: scoping is not getting applied to the pagination
    const organizations = await Organization.query()
      .apply((scopes) => scopes.filter(request.only(['search', 'trashed'])))
      .paginate(page, limit)
    organizations.baseUrl('/organizations')

    const links = organizations.getUrlsForRange(1, organizations.lastPage)
    const {search, trashed} = request.all()

    await inertia.render('Organizations/Index', {
      filters: {search, trashed},
      organizations: {links, ...organizations.toJSON()}
    })
  }

  public async create ({inertia}: HttpContextContract) {
    await inertia.render('Organizations/Create')
  }

  public async store ({request, auth}: HttpContextContract) {
    const validated = await request.validate({
      schema: schema.create({
        name: schema.string({}, [rules.maxLength(100)])
      })
    })
    auth.user?.account.related('organizations').create({})
  }
}

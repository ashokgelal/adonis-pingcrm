import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Organization from 'App/Models/Organization'
import {rules, schema} from '@ioc:Adonis/Core/Validator'

export default class OrganizationsController {
  public async index ({request, inertia}: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 10
    // fixme: scoping is not getting applied to the pagination
    const organizations = await Organization.query()
      .apply((scopes) => scopes.filter(request.only(['search'])))
      .paginate(page, limit)
    organizations.baseUrl('/organizations')

    const links = organizations.getUrlsForRange(1, organizations.lastPage)
    const {search} = request.all()

    await inertia.render('Organizations/Index', {
      filters: {search},
      organizations: {links, ...organizations.toJSON()}
    })
  }

  public async create ({inertia}: HttpContextContract) {
    await inertia.render('Organizations/Create')
  }

  public async store ({request, response, session, auth}: HttpContextContract) {
    const validated = await request.validate(OrganizationsController.organizationValidator)
    const user = auth.user
    await user?.preload('account')
    await user?.account.related('organizations').create(validated)
    session.flash('success', 'Organization created.')
    response.redirect().back()
  }

  public async edit ({params, inertia}: HttpContextContract) {
    const organization = await Organization.findOrFail(params.organization)
    await organization.preload('contacts', function (query) {
      query.select('id', 'firstName', 'lastName', 'city', 'phone').orderBy(['firstName', 'lastName'])
    })
    await inertia.render('Organizations/Edit', {organization})
  }

  public async update ({request, response, session, params}: HttpContextContract) {
    const validated = await request.validate(OrganizationsController.organizationValidator)
    const organization = await Organization.findOrFail(params.organization)
    organization.name = validated.name
    organization.email = validated.email
    organization.phone = validated.phone
    organization.address = validated.address
    organization.city = validated.city
    organization.region = validated.region
    organization.country = validated.country
    organization.postalCode = validated.postal_code
    await organization.save()
    session.flash('success', 'Organization updated.')
    response.redirect().back()
  }

  public async destroy ({response, session, params}: HttpContextContract) {
    const organization = await Organization.findOrFail(params.organization)
    await organization.delete()
    session.flash('success', 'Organization deleted.')
    response.redirect().toRoute('organizations.index')
  }

  private static get organizationValidator () {
    return {
      schema: schema.create({
        name: schema.string({}, [rules.required(), rules.maxLength(100)]),
        email: schema.string({}, [rules.maxLength(50), rules.email()]),
        phone: schema.string({}, [rules.maxLength(50)]),
        address: schema.string({}, [rules.maxLength(150)]),
        city: schema.string({}, [rules.maxLength(50)]),
        region: schema.string({}, [rules.maxLength(50)]),
        country: schema.string({}, [rules.maxLength(2)]),
        postal_code: schema.string({}, [rules.maxLength(25)]),
      })
    }
  }
}

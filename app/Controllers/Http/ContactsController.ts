import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {rules, schema} from '@ioc:Adonis/Core/Validator'
import Contact from 'App/Models/Contact'

export default class ContactsController {
  public async index ({request, inertia}: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 10
    // fixme: scoping is not getting applied to the pagination
    const contacts = await Contact.query()
      .preload('organization')
      .apply((scopes) => {
        scopes.filter(request.only(['search']))
        scopes.orderByName()
      })
      .paginate(page, limit)
    contacts.baseUrl('/contacts')

    const links = contacts.getUrlsForRange(1, contacts.lastPage)
    const {search} = request.all()

    await inertia.render('Contacts/Index', {
      filters: {search},
      contacts: {links, ...contacts.toJSON()}
    })
  }

  public async create ({auth, inertia}: HttpContextContract) {
    const user = auth.user
    await user?.preload('account', async (query) => {
      await query.preload('organizations')
    })
    const organizations = await auth.user?.account.organizations
    await inertia.render('Contacts/Create', {organizations})
  }

  public async store ({request, response, session, auth}: HttpContextContract) {
    const validated = await request.validate(ContactsController.contactValidator)
    const user = auth.user
    await user?.preload('account')
    await user?.account.related('contacts').create(validated)
    session.flash('success', 'Contact created.')
    response.redirect().back()
  }

  public async edit ({auth, params, inertia}: HttpContextContract) {
    const contact = await Contact.findOrFail(params.contact)
    const user = auth.user
    await user?.preload('account', async (query) => {
      await query.preload('organizations', async (query) => {
        query.select(['id', 'name'])
        query.orderBy('name')
      })
    })
    const organizations = await auth.user?.account.organizations
    await inertia.render('Contacts/Edit', {contact, organizations})
  }

  public async update ({request, response, session, params}: HttpContextContract) {
    const validated = await request.validate(ContactsController.contactValidator)
    const contact = await Contact.findOrFail(params.contact)
    contact.firstName = validated.first_name
    contact.lastName = validated.last_name
    contact.email = validated.email
    contact.phone = validated.phone
    contact.address = validated.address
    contact.city = validated.city
    contact.region = validated.region
    contact.country = validated.country
    contact.postalCode = validated.postal_code
    await contact.save()
    session.flash('success', 'Contact updated.')
    response.redirect().back()
  }

  public async destroy ({response, session, params}: HttpContextContract) {
    console.log(params)
    const organization = await Contact.findOrFail(params.contact)
    await organization.delete()
    session.flash('success', 'Contact deleted.')
    response.redirect().toRoute('contacts.index')
  }

  private static get contactValidator () {
    return {
      schema: schema.create({
        first_name: schema.string({}, [rules.required(), rules.maxLength(50)]),
        last_name: schema.string({}, [rules.required(), rules.maxLength(50)]),
        organization_id: schema.number(),
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

import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class DashboardsController {
  public async index ({inertia}: HttpContextContract) {
    await inertia.render('Dashboard/Index')
  }
}

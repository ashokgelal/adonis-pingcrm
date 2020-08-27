import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class ReportsController {
  public async index ({inertia}: HttpContextContract) {
    await inertia.render('Reports/Index')
  }
}

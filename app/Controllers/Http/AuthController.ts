import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext';

export default class AuthController {
  public async showLoginForm ({inertia}: HttpContextContract) {
    await inertia.render('Auth/Login')
  }

  public async login ({request, auth, response}: HttpContextContract) {
    const {email, password} = request.all()
    await auth.attempt(email, password)
    return response.redirect('/')
  }

  public async logout ({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.redirect('/')
  }
}

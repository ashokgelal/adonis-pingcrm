import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext';

export default class LoginController {
  public async showLoginForm ({inertia}: HttpContextContract) {
    await inertia.render('Auth/Login')
  }

  public async login ({request, auth, response}: HttpContextContract) {
    const {email, password} = request.all()
    await auth.attempt(email, password)
    return response.redirect('/')
  }
}

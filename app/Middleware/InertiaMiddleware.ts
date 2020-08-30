import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/**
 * This is really not a middleware anymore. We are using hooks instead. But
 * for simplicity, I have used the same class
 */
export default class InertiaMiddleware {
  public async beforeRequest({ request }: HttpContextContract) {
    const isInertiaRequest = request.header("X-Inertia") || false
    if (isInertiaRequest) {
      // Hack Alert: This is to avoid Adonis sending a JSON object on validation errors
      // fixme: user better api
      request.ajax = function () {
        return false
      }
    }
  }

  public async beforeResponse({ response, request }: HttpContextContract) {
    const isInertiaRequest = request.header("X-Inertia") || false
    const inertiaVersion = request.header("X-Inertia-Version")

    if (!isInertiaRequest) {
      return
    }

    const version = '1'
    if (request.method() === "GET" && inertiaVersion !== version) {
      response.header('X-Inertia-Location', request.url())
      response.conflict('')
      return
    }

    const isRedirect = !!(response.getHeader("location") && response.response.statusCode === 302)
    const isInertiaSpecialMethod =  ["PUT", "PATCH", "DELETE"].indexOf(request.method()) >= 0

    if (isRedirect && isInertiaSpecialMethod) {
      // fixme: why does body needs to be set to an empty string even though the body of `seeOther()` accepts null?
      response.seeOther("")
    }
  }
}

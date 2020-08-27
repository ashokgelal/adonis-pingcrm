import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext"
import {ResponseContract} from "@ioc:Adonis/Core/Response";
import {RequestContract} from "@ioc:Adonis/Core/Request";

export default class InertiaMiddleware {
  public async handle({request, response}: HttpContextContract, next: () => Promise<void>) {
    const isInertiaRequest = request.header("X-Inertia") || false
    if (isInertiaRequest) {
      // Hack Alert: This is to avoid Adonis sending a JSON object on validation errors
      // fixme: user better api
      request.ajax = function () {
        return false
      }
    }
    await next()

    if (!isInertiaRequest) {
      return
    }
    // todo: how to get the assets version?
    const version = "1"
    const inertiaVersion = request.header("X-Inertia-Version");
    if (request.method() === "GET" && inertiaVersion !== version) {
      response.header("X-Inertia-Location", request.url())
      response.conflict("")
      return
    }

    if (InertiaMiddleware.shouldChangeRedirectStatus(request, response)) {
      // fixme: why does body needs to be set to an empty string even though the body of `seeOther()` accepts null?
      response.seeOther("")
    }
  }

  private static shouldChangeRedirectStatus(request: RequestContract, response: ResponseContract): Boolean {
    const isRedirect = response.getHeader("location") && response.response.statusCode === 302 || false
    return isRedirect && ["PUT", "PATCH", "DELETE"].indexOf(request.method()) >= 0
  }
}

import {TagContract} from '@ioc:Adonis/Core/View';
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext';
import { AllHtmlEntities } from 'html-entities'

export class Inertia {
  private _sharedData: Object = {}

  constructor (private ctx: HttpContextContract) {
  }

  public share (data: Object) {
    this._sharedData = {...this._sharedData, ...data}
  }

  public async render (component: String, props?: Object) {
    const {request, response, view} = this.ctx
    const isInertiaRequest = request.header('X-Inertia') || false
    const auth = await this.auth()
    const combinedProps = {...this._sharedData, ...this.extractErrors(), ...auth, ...props}

    const page = {component, props: combinedProps, url: request.url(true), version: '1'}
    if (isInertiaRequest) {
      response.vary('Accept')
      response.header('X-Inertia', 'true')
      response.json(page)
    } else {
      response.send(view.render('app', {page}))
    }
  }

  private async auth () {
    const {auth} = this.ctx
    if (auth.isAuthenticated) {
      const user = auth.user
      await user?.preload('account')
      user?.serialize()
      return {auth: {user}}
    }
  }

  private extractErrors () {
    // fixme: user better api
    const {session} = this.ctx
    const flash = session.flashMessages.all() || {}

    // extract auth errors if any
    const authErrors = flash.auth?.errors || {}
    delete flash.auth

    // extract errors out
    const errors = flash.errors || {}
    delete flash.errors

    return {flash, errors: {...authErrors, ...errors}}
  }
}

export default class InertiaProvider {
  public async boot () {
    await InertiaProvider.registerInertiaTag()
    await InertiaProvider.registerInertiaContext()
  }

  private static async registerInertiaTag () {
    const View = (await import('@ioc:Adonis/Core/View')).default
    const encoder = new AllHtmlEntities()
    const InertiaTag: TagContract = {
      seekable: false,
      block: false,
      tagName: 'inertia',
      compile (_, buffer, tag) {
        buffer.outputExpression(
          '`<div id="app" data-page="\${ctx.encode(JSON.stringify(state.page))}"\>`',
          tag.filename,
          tag.loc.start.line,
          true
        );
      },
      run (context) {
        context.macro('encode', function (value) {
          return encoder.encode(value)
        })
      }
    };
    View.registerTag(InertiaTag);
  }

  private static async registerInertiaContext () {
    const HttpContext = (await import('@ioc:Adonis/Core/HttpContext')).default
    HttpContext.getter('inertia', function () {
      return new Inertia(this)
    }, true)
  }
}

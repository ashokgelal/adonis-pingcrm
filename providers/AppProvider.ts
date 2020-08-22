import {IocContract} from "@adonisjs/fold"

export default class AppProvider {
  constructor(protected $container: IocContract) {
  }

  public register() {
    // Register your own bindings
  }

  public async boot() {
  }

  public shutdown() {
    // Cleanup, since app is going down
  }

  public ready() {
    // App is ready
  }
}

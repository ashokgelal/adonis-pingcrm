import {Inertia} from "../providers/InertiaProvider";
declare module "@ioc:Adonis/Core/HttpContext" {
  interface HttpContextContract {
    inertia: Inertia
  }
}

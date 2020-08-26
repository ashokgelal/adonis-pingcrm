import BaseSeeder from "@ioc:Adonis/Lucid/Seeder"
import Account from "App/Models/Account";
import {ContactFactory, OrganizationFactory, UserFactory} from "Database/factories";

export default class DatabaseSeeder extends BaseSeeder {
  public async run() {
    const account = await Account.create({name: "Acme Corporation"})
    await UserFactory.merge({
        accountId: account.id,
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        owner: true
      }
    ).create()

    await UserFactory.merge({
      accountId: account.id
    }).createMany(5)

    const organizations = await OrganizationFactory.merge({
      accountId: account.id
    }).createMany(100)

    function random(items: any[]) {
      return items[Math.floor(Math.random() * items.length)]
    }

    const contacts = await ContactFactory.merge({
      accountId: account.id,
    }).createMany(100)

    for (const contact of contacts) {
      contact.organizationId = random(organizations).id
      await contact.save()
    }
  }
}

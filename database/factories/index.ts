import Factory from "@ioc:Adonis/Lucid/Factory"
import User from "App/Models/User"
import {randomString} from "@poppinss/utils/build";
import Contact from "App/Models/Contact";
import Organization from "App/Models/Organization";
import Account from "App/Models/Account";

export const UserFactory = Factory
  .define(User, ({faker}) => {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.internet.email(),
      email: faker.internet.email(),
      password: "secret",
      rememberMeToken: randomString(10),
      owner: false
    }
  })
  .relation("account", () => AccountFactory)
  .build()


export const AccountFactory = Factory.define(Account, ({faker}) => {
  return {
    name: faker.company.companyName()
  }
}).build()

export const ContactFactory = Factory.define(Contact, ({faker}) => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    region: faker.address.state(),
    country: faker.address.countryCode(),
    postalCode: faker.address.zipCode()
  }
}).build()

export const OrganizationFactory = Factory.define(Organization, ({faker}) => {
  return {
    name: faker.company.companyName(),
    email: faker.internet.exampleEmail(),
    phone: faker.phone.phoneNumber(),
    address: faker.phone.phoneNumber(),
    city: faker.address.city(),
    region: faker.address.state(),
    country: faker.address.countryCode(),
    postalCode: faker.address.zipCode()
  }
}).build()

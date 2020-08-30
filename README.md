### ToDos

- [ ] Pass assets version back to the frontend for Inertia to decide whether to force reload the page or not. [InertiaMiddleware.ts]
- [ ] Fix a hack where we are force setting to `ajax` property to always return `false` to avoid sending back
a JSON object on validation errors. [InertiaMiddleware.ts]
- [ ] Check if there is a better way to check if a response is a redirect response. [InertiaMiddleware.ts] 
- [ ] Find a better way to extract flash messages and error message from the session object. [InertiaProvider.ts]
- [ ] Separate out Inertia related functionalities to a InertiaAdonis package.
- [ ] Find a better way to associate multiple Contacts to a random Organization when seeding. [seeders/Database.ts]
- [x] Pagination is not taking scoping into consideration. [OrganizationsController.ts]
- [ ] Decide if Laravel Mix can be replaced with just plain-old Webpack.
- [ ] Complete remaining PingCRM demo features.
- [ ] `seeOther()` method throws an exception if body isn't passed even though the signature of the method says nullable
is just fine. [InertiaMiddleware.ts]
- [x] Inconsistent behavior with `orderBy` with 1 vs multiple columns. With 1 column `orderBy('firstName')` works but
with multiple columns `orderBy(['firstName', 'lastName'])` does not. It needs to be `orderBy(['first_name', 'last_name'])`
instead. [OrganizationsController.ts]
- [ ] Calling toJSON() on the pagination object fails if one of the model's attributes has a single quote in it e.g. `O'Keefe`
- [x] IDE shows an error when calling `orWhereHas` on scoped query [Contact.ts #59]
- [ ] Not having a `db:refresh` command is kind of annoying during development.

### ToDos

- [ ] Pass assets version back to the frontend for Inertia to decide whether to force reload the page or not. [InertiaMiddleware.ts]
- [ ] Fix a hack where we are force setting to `ajax` property to always return `false` to avoid sending back
a JSON object on validation errors. [InertiaMiddleware.ts]
- [ ] Check if there is a better way to check if a response is a redirect response. [InertiaMiddleware.ts] 
- [ ] Find a better way to extract flash messages and error message from the session object. [InertiaProvider.ts]
- [ ] Separate out Inertia related functionalities to a InertiaAdonis package.
- [ ] Find a better way to associate multiple Contacts to a random Organization when seeding. [seeders/Database.ts]
- [ ] Pagination is not taking scoping into consideration. [OrganizationsController.ts]
- [ ] Decide if Laravel Mix can be replaced with just plain-old Webpack.
- [ ] Complete remaining PingCRM demo features.

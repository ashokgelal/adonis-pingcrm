import Route from '@ioc:Adonis/Core/Route'

// Auth
Route.get('login', 'Auth/LoginController.showLoginForm')
Route.post('login', 'Auth/LoginController.login')

// Dashboard
Route.get('/', 'DashboardsController.index').middleware('auth')

// Users
Route.group(() => {
  Route.get('/', 'UsersController.index').as('index')
  Route.get('create', 'UsersController.create').as('create')
  Route.post('/', 'UsersController.store').as('store')
  Route.get(':user/edit', 'UsersController.edit').as('edit')
  Route.put(':user', 'UsersController.update').as('update')
  Route.delete(':user', 'UsersController.destroy').as('destroy')
  Route.put(':user/restore', 'UsersController.restore').as('restore')
}).prefix('users').as('users').middleware('auth')

Route.get('/img/:path', 'ImagesController.show').where('path', '.*');

// Organizations
Route.group(() => {
  Route.get('/', 'OrganizationsController.index').as('index')
  Route.get('create', 'OrganizationsController.create').as('create')
  Route.post('/', 'OrganizationsController.store').as('store')
  Route.get(':organization/edit', 'OrganizationsController.edit').as('edit')
  Route.put(':organization', 'OrganizationsController.update').as('update')
  Route.delete(':organization', 'OrganizationsController.destroy').as('destroy')
  Route.put(':organization/restore', 'OrganizationsController.restore').as('restore')
}).prefix('organizations').as('organizations').middleware('auth')

// Contacts
Route.group(() => {
  Route.get('/', 'ContactsController.index').as('index')
  Route.get('create', 'ContactsController.create').as('create')
  Route.post('/', 'ContactsController.store').as('store')
  Route.get(':contact/edit', 'ContactsController.edit').as('edit')
  Route.put(':contact', 'ContactsController.update').as('update')
  Route.delete(':contact', 'ContactsController.destroy').as('destroy')
  Route.put(':contact/restore', 'ContactsController.restore').as('restore')
}).prefix('contacts').as('contacts').middleware('auth')

// Reports
Route.get('reports', 'ReportsController.index').as('reports').middleware('auth');

Route.get('/500', () => {
  throw new Error('This is intentionally thrown to demo a 500 error')
})

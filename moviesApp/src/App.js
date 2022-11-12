import {Route, Switch} from 'react-router-dom'

import './App.css'

import HomeRoute from './components/HomeRoute'
import LoginRoute from './components/LoginRoute'
import MovieItemDetailsRoute from './components/MovieItemDetailsRoute'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import PopularRoute from './components/PopularRoute'
import SearchRoute from './components/SearchRoute'
import AccountRoute from './components/AccountRoute'
import NotFound from './components/NotFoundRoute'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginRoute} />
      <ProtectedRoute exact path="/" component={HomeRoute} />
      <ProtectedRoute exact path="/popular" component={PopularRoute} />
      <ProtectedRoute
        exact
        path="/movies/:id"
        component={MovieItemDetailsRoute}
      />
      <ProtectedRoute exact path="/search" component={SearchRoute} />
      <ProtectedRoute exact path="/account" component={AccountRoute} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App

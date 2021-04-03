import React from 'react'

import { useAuth } from './contexts/auth-context'

import AuthenticatedApp from './components/authenticated-app'
import UnauthenticatedApp from './components/unathenticated-app'

import './app.scss';

const App = () => {
    const auth = useAuth()
    return auth.isLoggedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

export default App
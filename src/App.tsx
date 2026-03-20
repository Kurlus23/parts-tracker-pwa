import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Route, Switch } from 'wouter'
import Home from './pages/Home'
import Scan from './pages/Scan'
import Inventory from './pages/Inventory'
import Sites from './pages/Sites'
import Parts from './pages/Parts'
import BottomNav from './components/BottomNav'
import ReloadPrompt from './components/ReloadPrompt'

const qc = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={qc}>
      <div className="min-h-screen pb-20 bg-gray-50 text-gray-900">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/scan" component={Scan} />
          <Route path="/inventory" component={Inventory} />
          <Route path="/sites" component={Sites} />
          <Route path="/parts" component={Parts} />
        </Switch>
        <BottomNav />
        <ReloadPrompt />
      </div>
    </QueryClientProvider>
  )
}

import { BuilderColumn } from './components/builder/BuilderColumn'
import { AppShell } from './components/layout/AppShell'
import { ReviewPanel } from './components/review/ReviewPanel'
import { BundleProvider } from './state/BundleContext'

function App() {
  return (
    <BundleProvider>
      <AppShell builder={<BuilderColumn />} review={<ReviewPanel />} />
    </BundleProvider>
  )
}

export default App

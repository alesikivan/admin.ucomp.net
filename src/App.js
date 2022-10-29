import { Provider } from 'react-redux'

import store from './redux/store'

import Footer from './componets/particles/Footer'
import Header from './componets/particles/Header'
import Pages from "./componets/pages/Pages"
import ScrollToTop from './utils/scrollToTop'

import './index.css'
import { authInit } from './utils/authInit'
import Navigation from './componets/particles/Navigation'

authInit()

function App() {
  return (
    <Provider store={store}>
      <div className="application">
        <Header />
        <div className="app-container">
          <ScrollToTop />
          <Navigation />
          <Pages/>
        </div>
        <Footer />
      </div>
    </Provider>
  )
}

export default App

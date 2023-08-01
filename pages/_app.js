import { Provider } from 'react-redux'

import { useStore } from '../store'
import '../styles/globals.css'
import '../styles/tailwind.css'
import '../styles/components/cards.css'
import 'nextra-theme-docs/style.css'

export default ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState)
  const getLayout = Component.getLayout || (page => page)

  return (
    <Provider store={store}>
      {getLayout(<Component { ...pageProps } />)}
    </Provider>
  )
}
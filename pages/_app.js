import {chain,

  WagmiConfig,
  createClient,
  configureChains,
  defaultChains,
} from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'


const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.goerli],
  [publicProvider()],
)

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})

function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  )
}

export default App

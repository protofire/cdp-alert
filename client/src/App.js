import React, { Component } from 'react'
import Maker from '@makerdao/dai'
import { ThemeProvider } from 'styled-components'

import { web3Checker, Web3States } from './utils/web3'
import theme from './utils/theme'
import formatNumber from './utils/format-number'
import {
  Layout,
  Header,
  Main,
  Footer,
  Github,
  Protofire,
  Section,
  Block,
  // HelpIcon,
  Button,
  TokenIconWrapper,
  // IconDAI,
  IconETH,
  DollarSign,
  Address,
  WalletCdpsTable,
  NewAlertNumberInput,
  NewAlertEmailInput,
  Modal,
  Dialog,
  CancelDialogButton,
  AcceptDialogButton,
  // HelpPopup,
  Web3ScreenStyled,
  WalletSelection,
  NewAlertForm
} from './components/Styled'

class App extends Component {
  constructor (props) {
    super(props)

    this.LS = '...'

    this.state = {
      web3Status: Web3States.NoWeb3,
      ...this.emptyInitialState()
    }

    this.checkWeb3().then(() => {
      const makerArgs = []

      switch (this.state.networkId) {
        case 1:
          makerArgs.push('mainnet')
          break
        case 42:
          makerArgs.push('kovan')
          break
        case 5777:
          makerArgs.push('test')
          break
        default:
          break
      }

      if (makerArgs.length) {
        this.maker = Maker.create(...makerArgs)
      }
      this.initDApp()
    })
  }

  emptyInitialState = () => ({
    step: 3,
    networkId: -1,
    ethPrice: 298.423,
    // wallet
    walletAddress: '0x7557f009a3f16ebbedc469515d3dac5cbe9c3939',
    // wizard
    email: 'mariano.ramonda@altoros.com',
    minRatio: '12',
    maxRatio: '23',
    // flags
    loadingData: false,
    showForm: false,
    showNotice: false,
    showComingSoonModal: false,
    alertCreatedStatus: null,
    showHelp: ''
  })

  makerAttachEvents = () => {
    const {Web3States} = this

    this.maker.on('web3/AUTHENTICATED', async eventObj => {
      const {account: walletAddress} = eventObj.payload
      await this.setState({walletAddress})
      await this.checkWeb3()
    })

    this.maker.on('web3/DEAUTHENTICATED', async () => {
      await this.setState({walletAddress: this.LS})
      await this.checkWeb3()
    })

    this.maker.on('web3/DISCONNECTED', async () => {
      await this.setState({web3Status: Web3States.NoWeb3})
      await this.checkWeb3()
    })
  }

  toggleDialog = () => this.setState(prevState => ({showForm: !prevState.showForm}))

  toggleNotice = () => this.setState(prevState => ({showNotice: !prevState.showNotice}))

  toggleComingSoonModal = () =>
    this.setState(prevState => ({showComingSoonModal: !prevState.showComingSoonModal}))

  // showHelp = showHelp => this.setState({showHelp})

  getNetworkName = networkId => {
    switch (Number(networkId)) {
      case 1:
        return 'MainNet'
      case 3:
        return 'Ropsten'
      case 4:
        return 'Rinkeby'
      case 42:
        return 'Kovan'
      case 5777:
        return 'TestNet'
      default:
        return 'Unknown Network'
    }
  }

  checkWeb3 = async () => {
    const {res: web3Status, networkId} = await web3Checker()
    this.setState({web3Status})
    if (networkId) {
      this.setState({networkId})
    }
  }

  initDApp = async () => {
    console.log(211)
    if (this.maker) {
      this.makerAttachEvents()
      await this.maker.authenticate()
      await this.updateEthPrice()
    }
    this.setState({walletCdps: await this.getWalletCdps()})
  }

  updateEthPrice = async () => {
    const priceService = this.maker.service('price')
    const ethPrice = await priceService.getEthPrice()
    this.setState({ethPrice: await ethPrice.toNumber()})
  }

  createAlert = async () => {
    const {email, walletAddress, minRatio, maxRatio} = this.state


    const rawRes = await fetch('https://cdp-alert-api.now.sh/alerts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'email': email,
        'cdps': this.getWalletCdps().map(cdp => String(cdp.id)),
        'address': walletAddress,
        'min': minRatio,
        'max': maxRatio
      })
    })

    const jsonRes = rawRes.json()

    this.setState({alertCreatedStatus: jsonRes.type === 200}, () => this.toggleNotice())
  }

  changeStep = step => this.setState({step})

  getWalletCdps = () => [
    {
      id: 123,
      borrowedDai: 230.876,
      lockedEth: 1.923,
      liquidationPrice: 390.893
    },
    {
      id: 133,
      borrowedDai: 876,
      lockedEth: 2.567,
      liquidationPrice: 400.123
    },
    {
      id: 135,
      borrowedDai: 50,
      lockedEth: 0.134,
      liquidationPrice: 251.785
    },
    {
      id: 189,
      borrowedDai: 970.897,
      lockedEth: 28.343,
      liquidationPrice: 356.98
    },
    {
      id: 235,
      borrowedDai: 230.876,
      lockedEth: 1.923,
      liquidationPrice: 390.893
    },
    {
      id: 267,
      borrowedDai: 376,
      lockedEth: 2.567,
      liquidationPrice: 400.123
    },
    {
      id: 342,
      borrowedDai: 50,
      lockedEth: 0.134,
      liquidationPrice: 251.785
    },
    {
      id: 346,
      borrowedDai: 8970.897,
      lockedEth: 38.343,
      liquidationPrice: 356.98
    }
  ]

  render () {
    const {
      step,
      web3Status,
      walletCdps,
      networkId,
      ethPrice,
      walletAddress,
      eth,
      cdpCreationStep,
      showForm,
      showNotice,
      showComingSoonModal,
      // showHelp
    } = this.state

    const {LS} = this
    const allowedNetwork = [1, 42, 5777].includes(networkId)

    return (
      <ThemeProvider theme={theme}>
        <Layout>
          <Header>
            <h1>CDP Alert</h1>
            <h4>This is a demo DApp. Data is faked.</h4>
          </Header>
          <Main>
            {false && web3Status === Web3States.NoWeb3 && (
              <Web3ScreenStyled>
                <h2>No Web3 Available</h2>
                <p>You need a wallet manager in order to use CDP Alert.</p>
                <p>
                  Most popular option is Metamask:{' '}
                  <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
                    https://metamask.io/
                  </a>
                </p>
                <p>Once installed, please reload the page.</p>
              </Web3ScreenStyled>
            )}
            {false && web3Status === Web3States.NoAccount && (
              <Web3ScreenStyled>
                <h2>No Web3 Account Selected</h2>
                <p>
                  Please login with your preferred wallet manager and choose the address you want to
                  use CDP Alert with.
                </p>
                <p>Once logged in, please reload the page.</p>
              </Web3ScreenStyled>
            )}
            {false && web3Status === Web3States.OK &&
            !allowedNetwork && (
              <Web3ScreenStyled>
                <h2>Network not allowed</h2>
                <p>
                  You are currently on {this.getNetworkName(networkId)} (ID {networkId})
                </p>
                <p>At the moment you can use CDP Alert on MainNet or Kovan.</p>
                <p>Please change the network and try again.</p>
              </Web3ScreenStyled>
            )}
            {step === 1 && (
              <Section>
                <h2>Alerts on DAI Collateral</h2>
                <Block>
                  <p><i>"Don't get under or over collateralized"</i></p>
                </Block>
                <Block>
                  <Button onClick={() => this.changeStep(2)}>Start Monitoring</Button>
                </Block>
              </Section>
            )}
            {step === 2 && (
              <Section>
                <h2>Select Wallet</h2>
                <WalletSelection>
                  <button disabled={true}>MetaMask</button>
                  <button disabled={true}>Ledger Nano</button>
                  <button disabled={true}>Trezor</button>
                  <button onClick={() => this.changeStep(3)}>Demo Wallet</button>
                </WalletSelection>
              </Section>
            )}
            {step === 3 && (true || web3Status === Web3States.OK &&
              allowedNetwork) && (
              <React.Fragment>
                <Section className="general-info">
                  <Address>Your address: {walletAddress || LS}</Address>
                  <TokenIconWrapper>
                    <DollarSign/>
                    <span>
                        {ethPrice > -1 ? formatNumber(ethPrice) : LS}
                      </span>
                    <span><IconETH/>ETH price</span>
                  </TokenIconWrapper>
                </Section>

                <Section>
                  <h2>My CDPs</h2>
                  <Block>
                    {!walletCdps && <span className="no-cdps-found">No CDPs found</span>}
                    {walletCdps && (
                      <WalletCdpsTable>
                        <thead>
                        <tr>
                          <th>CDP ID</th>
                          <th>Borrowed DAI</th>
                          <th>Locked ETH</th>
                          <th>Liquidation Price</th>
                          <th>Collateral %</th>
                        </tr>
                        </thead>
                        <tbody>
                        {walletCdps.map((cdp, index) => {
                          const collateral =
                            Math.round(cdp.lockedEth * ethPrice / cdp.borrowedDai * 100)

                          return (
                            <tr key={cdp.id} className={index % 2 ? '' : 'coloredBg'}>
                              <td>{cdp.id}</td>
                              <td>{formatNumber(cdp.borrowedDai, 3, 3)}</td>
                              <td>{formatNumber(cdp.lockedEth, 3, 3)}</td>
                              <td>
                                <DollarSign/> {formatNumber(cdp.liquidationPrice, 3, 3)}
                              </td>
                              <td
                                className={[
                                  'bold',
                                  (collateral <= 175 && 'red') || (collateral >= 300 && 'green')
                                ].join(' ')}>
                                {collateral} %
                              </td>
                            </tr>
                          )
                        })}
                        </tbody>
                      </WalletCdpsTable>
                    )}
                  </Block>

                  <NewAlertForm>
                    <p>Set up a new alert</p>
                    <p>Collateralization ratio under <NewAlertNumberInput/> or
                      over <NewAlertNumberInput/> becomes elegible for liquidation.</p>
                    <p><span>Email to receive notifications:</span> <NewAlertEmailInput/></p>
                  </NewAlertForm>

                  <Block>
                    <Button
                      type="button"
                      onClick={() => this.toggleDialog()}
                    >
                      Create Alert
                    </Button>
                  </Block>
                </Section>

                {showForm && (
                  <Modal>
                    <Dialog>
                      <h3>Set up a new Alert</h3>
                      <p>
                        Current ETH price: <DollarSign/><span>{eth} </span>.
                      </p>
                      <p>Are you sure you want to proceed with this transaction?</p>
                      <div className="buttons">
                        <CancelDialogButton onClick={() => this.toggleDialog()}>
                          Cancel
                        </CancelDialogButton>
                        <AcceptDialogButton onClick={() => this.createAlert()}>
                          Create Alert
                        </AcceptDialogButton>
                      </div>
                    </Dialog>
                  </Modal>
                )}

                {showNotice && (
                  <Modal>
                    <Dialog>
                      <h3>Waiting...</h3>
                      {cdpCreationStep === 1 && <p>We will proceed creating the new CDP.</p>}
                      <p>Please accept pending transaction on your wallet.</p>
                      <img src="/images/waiting-coin.svg" alt="Waiting"/>
                    </Dialog>
                  </Modal>
                )}

                {showComingSoonModal && (
                  <Modal>
                    <Dialog>
                      <h3>Coming Soon!</h3>
                      <p>This feature will be available in future releases.</p>
                      <img
                        className="coming-soon"
                        src="/images/coming-soon.svg"
                        alt="Coming Soon"
                      />
                      <div className="buttons">
                        <CancelDialogButton onClick={() => this.toggleComingSoonModal()}>
                          Close
                        </CancelDialogButton>
                      </div>
                    </Dialog>
                  </Modal>
                )}
              </React.Fragment>
            )}
          </Main>

          <Footer>
            <p>
              Open Source <Github/>. Made with <span>❤</span> by <Protofire/>.
            </p>
          </Footer>
        </Layout>
      </ThemeProvider>
    )
  }
}

export default App

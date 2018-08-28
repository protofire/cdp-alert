import React, { Component } from 'react'
import Maker from '@makerdao/dai'
import { ThemeProvider } from 'styled-components'

import { web3Checker, Web3States } from './utils/web3'
import theme from './utils/theme'
import formatNumber from './utils/format-number'
import {
  Main,
  Header,
  Section,
  EthIcon,
  Button,
  WalletCdpsTable,
  Modal,
  Dialog,
  NewAlertForm,
  NewAlertNumberInput,
  NewAlertEmailInput,
  Percent
} from './components/Styled'

class App extends Component {
  constructor (props) {
    super(props)

    this.LS = '...'

    this.state = {
      ...this.emptyInitialState()
    }
  }

  componentWillUnmount() {
    clearInterval(this.updateEthPriceInterval)
  }

  emptyInitialState = () => ({
    step: 1,
    ethPrice: -1,
    email: '',
    minRatio: '200',
    maxRatio: '300',
    working: true,
    creationSuccess: null,
    showNotice: false,
    demoAccount: '0x0000000000000000000000000000000000000000',
    metamaskAccount: null
  })

  initMetamask = async () => {
    const web3Check = await web3Checker()
    if (web3Check.res === Web3States.OK
      && [1, 42].includes(web3Check.networkId)
      && web3Check.account) {
      this.maker = Maker.create(web3Check.networkId === 1 ? 'mainnet' : 'kovan', { log: false})
      await this.setState({
        web3: web3Check.web3,
        metamaskAccount: web3Check.account,
        networkId: web3Check.networkId
      })
      await this.makerAttachEvents()
      this.maker.authenticate()
    } else {
      await this.setState({
        web3: null,
        metamaskAccount: null,
        networkId: null
      })
    }
  }

  makerAttachEvents = () =>
    this.maker.on('web3/DEAUTHENTICATED', async () => {
      await this.initMetamask()
      this.changeStep(2)
    })

  toggleNotice = () => this.setState(prevState => {
    const newState = {
      showNotice: !prevState.showNotice
    }
    if (prevState.showNotice) {
      newState.email = ''
      newState.minRatio = '200'
      newState.maxRatio = '300'
    } else {
      newState.working = true
      newState.creationSuccess = null
    }

    return newState
  })

  updateEthPrice = async () => {
    const ethPrice = this.state.selectedWallet === 'metamask'
      ?  (await (await this.maker.service('price')).getEthPrice()).toNumber()
      :  (await (await fetch('https://api.coinmarketcap.com/v1/ticker/ethereum/')).json())[0].price_usd

    this.setState({ethPrice})
  }

  handleChangeInput = name => event => this.setState({[name]: event.target.value})

  handleSubmit = event => {
    event.preventDefault()
    this.toggleNotice()
    this.createAlert()
  }

  createAlert = async () => {
    const {email, minRatio, maxRatio, selectedWallet, demoAccount, metamaskAccount} = this.state

    let res
    try {
      res = await fetch('https://cdp-alert-api.now.sh/alerts', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'email': email,
          'cdps': this.getWalletCdps().map(cdp => String(cdp.id)),
          'address': selectedWallet === 'demo' ? demoAccount : metamaskAccount,
          'min': minRatio,
          'max': maxRatio
        })
      })
    } catch (e) {
      // mindfullness
    } finally {
      this.setState({
        creationSuccess: res.ok,
        working: false
      })
    }
  }

  changeStep = async step => {
    if (step === 3) {
      await this.updateEthPrice()
      this.updateEthPriceInterval = window.setInterval(() => this.updateEthPrice(), 5000)
    } else {
      window.clearInterval(this.updateEthPriceInterval)
      this.updateEthPriceInterval = null
      if (step === 2) {
        await this.initMetamask()
      }
    }
    this.setState({step})
  }

  goWithSelectedWallet = async selectedWallet => {
    await this.setState({selectedWallet})

    switch (selectedWallet) {
      case 'metamask':
        await this.setState({walletCdps: this.getWalletCdps()})
        break
      case 'ledger':
        // tbd
        break
      case 'trezor':
        // tbd
        break
      default:
      case 'demo':
        await this.setState({walletCdps: this.getWalletCdps()})
        break
    }

    this.changeStep(3)
  }

  getWalletCdps = () => {
    switch (this.state.selectedWallet) {
      case 'metamask':
        // fetch('')
        break;
      default:
      case 'demo':
        return [
          {id: 3024, borrowedDai: 7536.470, lockedEth: 48.953, liquidationPrice: 226.189},
          {id: 3025, borrowedDai: 51000, lockedEth: 390.000, liquidationPrice: 390.000},
          {id: 3042, borrowedDai: 30000, lockedEth: 195.012, liquidationPrice: 226.019},
          {id: 3051, borrowedDai: 11000, lockedEth: 107.057, liquidationPrice: 150.960},
          {id: 3058, borrowedDai: 80, lockedEth: 0.489, liquidationPrice: 240.019},
          {id: 3074, borrowedDai: 95, lockedEth: 0.734, liquidationPrice: 189.999},
          {id: 3081, borrowedDai: 10, lockedEth: 0.214, liquidationPrice: 68.598},
          {id: 3083, borrowedDai: 1210, lockedEth: 10, liquidationPrice: 177.775}
        ]
    }
  }

  render () {
    const {LS} = this
    const {
      step,
      email,
      minRatio,
      maxRatio,
      walletCdps,
      ethPrice,
      showNotice,
      working,
      creationSuccess,
      metamaskAccount,
      networkId
    } = this.state

    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <Header className={step > 2 ? 'black-bg' : ''}>
            <h3>CDP Alert</h3>
          </Header>
          <Main className={step > 2 ? 'white-bg' : ''}>
            {step === 1 && (
              <Section className="home">
                <h2>Alerts on DAI collateralized debt position (CDP)</h2>
                <hr/>
                <hr/>
                <p>Don’t get under or over collateralized</p>
                <button onClick={() => this.changeStep(2)}>Start Monitoring</button>
              </Section>
            )}
            {step === 2 && (
              <Section className="login">
                <div>
                  <h2>Select your wallet client</h2>
                  <div>
                    <hr/>
                    <hr/>
                  </div>
                  <div>
                    <button className="demo" onClick={() => this.goWithSelectedWallet('demo')}>Demo
                      <span className="connected">Connected</span>
                    </button>
                    <button className="metamask" disabled={!metamaskAccount}
                            onClick={() => this.goWithSelectedWallet('metamask')}>Metamask
                      {!metamaskAccount && <span className="allowedNets">(MainNet or Kovan)</span>}
                      {metamaskAccount && <span
                        className="connected">Connected to {networkId === 1 ? 'MainNet' : 'Kovan'}</span>}
                    </button>
                    <button className="ledger" disabled={true}/>
                    <button className="trezor" disabled={true}/>
                  </div>
                </div>
              </Section>
            )}
            {step === 3 && (
              <React.Fragment>
                <Section className="cdps">
                  <h2>Your CDPs</h2>
                  <hr/>
                  <hr/>
                  <div>
                    <EthIcon/>
                    <span>
                      Current Eth Price{' '}
                      <strong>${ethPrice > -1 ? formatNumber(ethPrice, 3, 3) : LS}</strong>
                    </span>
                  </div>
                  {!walletCdps && <span className="no-cdps-found">..No CDPs found..</span>}
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
                      {walletCdps && walletCdps.map(cdp => {
                        const collateral =
                          Math.round(cdp.lockedEth * ethPrice / cdp.borrowedDai * 100)

                        return (
                          <tr key={cdp.id}>
                            <td>{cdp.id}</td>
                            <td>{formatNumber(cdp.borrowedDai, 3, 3)}</td>
                            <td>{formatNumber(cdp.lockedEth, 3, 3)}</td>
                            <td>
                              ${formatNumber(cdp.liquidationPrice, 3, 3)}
                            </td>
                            <td
                              className={
                                (collateral <= 200 && 'red') ||
                                (collateral >= 300 && 'green') ||
                                ''}>
                              {collateral} %
                            </td>
                          </tr>
                        )
                      })}
                      <tr>
                        <td colSpan="5">
                          <div>
                            <button>&lt; Previous</button>
                            <button>Next &gt;</button>
                          </div>
                        </td>
                      </tr>
                      </tbody>
                    </WalletCdpsTable>
                  )}

                  <NewAlertForm onSubmit={event => this.handleSubmit(event)}>
                    <p>Collateralization ratio under <NewAlertNumberInput
                      onChange={this.handleChangeInput('minRatio')}
                      value={minRatio}/><Percent/> or over <NewAlertNumberInput
                      value={maxRatio}
                      onChange={this.handleChangeInput('maxRatio')}/><Percent/> will trigger the alert</p>
                    <div>
                      <NewAlertEmailInput
                        placeholder="Email address..."
                        value={email}
                        onChange={this.handleChangeInput('email')}/>
                      <Button>Get alerts</Button>
                    </div>
                  </NewAlertForm>
                </Section>

                {showNotice && (
                  <Modal>
                    <Dialog>
                      {working && <h3>Creating Alarm</h3>}
                      {!working && creationSuccess && <h3>CDP Alert Created</h3>}
                      {!working && !creationSuccess && <h3>Alert Creation Error</h3>}
                      <hr/>
                      <hr/>
                      {working &&
                      <p className="one-line">Please wait, this should not take too long.</p>}
                      {!working && creationSuccess && (
                        <React.Fragment>
                          <p>From now on you will receive email alerts to <span
                            className="bold">{email}</span></p>
                          <p>
                            When the collateralization ratio goes under <span
                            className="red">{minRatio}%</span> or
                            over <span className="green">{maxRatio}%</span>
                          </p>
                        </React.Fragment>
                      )}
                      {!working && !creationSuccess && (
                        <p className="one-line">There was an error while trying to create the alarm.
                          Please try again.</p>)}
                      {working && <img src="/images/working.svg" alt="Creating alarm"/>}
                      {!working && <button onClick={() => this.toggleNotice()}>Close</button>}
                    </Dialog>
                  </Modal>
                )}
              </React.Fragment>
            )}
          </Main>
        </React.Fragment>
      </ThemeProvider>
    )
  }
}

export default App

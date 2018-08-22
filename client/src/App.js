import React, { Component } from 'react'
import Maker from '@makerdao/dai'
import { ThemeProvider } from 'styled-components'

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

    // this.initDApp()
  }

  emptyInitialState = () => ({
    step: 1,
    ethPrice: 298.423,
    email: '',
    minRatio: '175',
    maxRatio: '300',
    showNotice: false,
    walletCdps: this.getWalletCdps()
  })

  initDApp = async () => {
    this.maker = Maker.create('kovan')
    await this.makerAttachEvents()
    await this.maker.authenticate()
    await this.updateEthPrice()
  }

  makerAttachEvents = () => {
    this.maker.on('web3/AUTHENTICATED', async eventObj => {
      const {account: walletAddress} = eventObj.payload
      await this.setState({walletAddress})
    })

    this.maker.on('web3/DEAUTHENTICATED', async () => {
      await this.setState({walletAddress: this.LS})
    })
  }

  toggleNotice = () => this.setState(prevState => {
    const newState = {
      showNotice: !prevState.showNotice
    }
    if (prevState.showNotice) {
      newState.email = ''
      newState.minRatio = '175'
      newState.maxRatio = '300'
    }

    return newState
  })

  updateEthPrice = async () => {
    const priceService = this.maker.service('price')
    const ethPrice = await priceService.getEthPrice()
    this.setState({ethPrice: await ethPrice.toNumber()})
  }

  handleChangeInput = name => event => this.setState({[name]: event.target.value})

  handleSubmit = event => {
    event.preventDefault()
    this.toggleNotice()
    this.createAlert()
  }

  createAlert = () => {
    const {email, minRatio, maxRatio, walletAddress} = this.state

    try {
      fetch('https://cdp-alert-api.now.sh/alerts', {
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
    } catch (e) {
      // mindfullness
    }
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
    const {LS} = this
    const {step, email, minRatio, maxRatio, walletCdps, ethPrice, showNotice} = this.state
console.log(this.state)
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <Header className={step > 2 ? 'black-bg' : ''}>
            <h3>
              CDP Alerts Logo
            </h3>
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
                    <button className="demo" onClick={() => this.changeStep(3)}>Demo</button>
                    <button className="metamask" disabled={true}>Metamask</button>
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
                      <strong>${ethPrice > -1 ? formatNumber(ethPrice) : LS}</strong>
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
                            <td>{formatNumber(cdp.borrowedDai, 2, 2)}</td>
                            <td>{formatNumber(cdp.lockedEth, 2, 2)}</td>
                            <td>
                              ${formatNumber(cdp.liquidationPrice, 2, 2)}
                            </td>
                            <td
                              className={
                                (collateral <= 175 && 'red') ||
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
                      onChange={this.handleChangeInput('maxRatio')}/><Percent/> becomes elegible for
                      liquidation</p>
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
                      <h3>CDP Alert Created</h3>
                      <hr/>
                      <hr/>
                      <p>From now on you will receive email alerts to <span
                        className="bold">{email}</span></p>
                      <p>
                        When the collateralization ratio goes under <span
                        className="red">{minRatio}%</span> or
                        over <span className="green">{maxRatio}%</span>
                      </p>
                      <button onClick={() => this.toggleNotice()}>OK</button>
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

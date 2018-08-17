import React from 'react'
import styled, { injectGlobal } from 'styled-components'

injectGlobal`
  html {
    height: 100%;
    width: 100%;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-weight: 600;

    * {
      font-family: 'Montserrat', sans-serif;
    }
  }
`

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  background-color: ${({theme}) => theme.color.bodyBg};

  width: 100%;
  min-height: 100vh;

  button {
    cursor: pointer;
  }
`

export const Header = styled.header`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 0;
  text-align: center;

  h1 {
    margin: 0;
    font-size: 3rem;
    font-variant: small-caps;
    color: ${({theme}) => theme.color.main};
  }

  h4 {
    margin: 0;
    padding: 0.2rem 0.5rem;
    user-select: none;
    font-size: 0.8rem;
    font-variant: small-caps;
    color: ${({theme}) => theme.color.sectionTag};
    background-color: ${({theme}) => theme.color.demoBg};
  }
`

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const Footer = styled.footer`
  flex: 1;
  display: flex;
  flex-direction: column-reverse;
  min-width: 63rem;
  max-width: 63rem;
  width: 100%;
  font-weight: 400;
  padding-bottom: 0.5rem;

  > p {
    margin: 1rem 0 0;
    text-align: center;

    > span {
      color: ${({theme}) => theme.color.heart};
      font-size: 1.5rem;
      vertical-align: sub;
    }
  }
`

const GithubLink = styled.a.attrs({
  href: 'https://github.com/protofire/open-cdp',
  target: '_blank',
  rel: 'noopener noreferrer'
})``

const Octocat = styled.img.attrs({
  src: '/images/octocat.png',
  alt: 'GitHub'
})`
  max-height: 2rem;
  vertical-align: text-bottom;
`

export const Github = () => (
  <GithubLink>
    <Octocat/>
  </GithubLink>
)

const ProtofireLink = styled.a.attrs({
  href: 'https://protofire.io',
  target: '_blank',
  rel: 'noopener noreferrer'
})`
  margin-left: 0.3rem;
`

const ProtofireLogo = styled.img.attrs({
  src: '/images/protofire.png',
  alt: 'Protofire'
})`
  max-height: 2rem;
  vertical-align: bottom;
`

export const Protofire = () => (
  <ProtofireLink>
    <ProtofireLogo/>
  </ProtofireLink>
)

export const Section = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;

  margin: 0.5rem 0 0.5rem;
  padding: 2.4rem 0 0;

  min-width: 35rem;

  font-size: 1.2rem;
  font-weight: 500;

  background-color: ${({theme}) => theme.color.sectionBg};
  border: 2px solid ${({theme}) => theme.color.main};
  border-radius: ${({theme}) => theme.border.radius};

  h2 {
    position: absolute;
    top: -2px;
    left: -2px;
    margin: 0;
    padding: 0.5rem 0.75rem;
    color: ${({theme}) => theme.color.sectionTag};
    font-size: 1.2rem;
    background-color: ${({theme}) => theme.color.main};
    border-bottom-right-radius: ${({theme}) => theme.border.radius};
    border-top-left-radius: ${({theme}) => theme.border.radius};
  }
  
  &.general-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    border: none;
    padding: 0;

    div:first-of-type {
      font-size: 0.85rem;
    }

    div:last-of-type {
      font-size: 1.6rem;
    }
  }
`

export const WalletSelection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  margin: 1rem 0;

  button {
    width: 20rem;
    height: 3rem;
    margin: 0.5rem auto;
    border: 0;
    border-radius: ${({theme}) => theme.border.radius};
    font-variant: petite-caps;
    font-size: 1.4rem;
    font-weight: 500;
    
    color: ${({theme}) => theme.color.sectionTag};
    background-color: ${({theme}) => theme.color.secondary};
    
    &:disabled {
      color: ${({theme}) => theme.color.gray};
      background-color: ${({theme}) => theme.color.softGray};
      cursor: not-allowed;
    }
    
  }
`

export const TokenIconWrapper = styled.div`
  span:first-of-type {
    margin-left: 0.4rem;
    font-size: 1.6rem;
  }

  span:last-of-type {
    font-size: 1.1rem;
    font-variant: petite-caps;
  }
`

/*
export const IconDAI = styled.img.attrs({
  src: "/images/token-dai.png",
  alt: "DAI"
})`
  height: 1.3rem;
  margin: 0 0.3rem;
`;
*/

export const IconETH = styled.img.attrs({
  src: '/images/token-eth.png',
  alt: 'ETH'
})`
  height: 1.5rem;
  margin: 0 0.3rem;
  vertical-align: text-bottom;
`

const DollarSignStyled = styled.i`
  color: ${({theme}) => theme.color.gray};
  font-size: 0.7rem;
  font-style: normal;
  font-weight: 600;
`

export const DollarSign = () => <DollarSignStyled>U$D</DollarSignStyled>

export const Address = styled.div`
  font-size: 0.85rem;
  font-weight: 400;
  color: ${({theme}) => theme.color.text};
`

export const HelpIcon = styled.i`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;

  width: 1rem;
  height: 1rem;
  color: ${({theme}) => theme.color.main};
  border: 2px solid ${({theme}) => theme.color.help};
  border-radius: 50%;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
`

/*
const HelpBubble = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 0;
  padding: 0 1rem;
  z-index: 100;

  max-width: 10rem;
  width: 100%;

  line-height: 1.2rem;
  color: ${({ theme }) => theme.color.sectionTag};

  background-color: ${({ theme }) => theme.color.secondary};
  border: 2px solid ${({ theme }) => theme.color.helpBorder};
  border-radius: ${({ theme }) => theme.border.radius};
`;
*/

// export const HelpPopup = props => <HelpBubble>{props.children}</HelpBubble>;

export const WalletCdpsTable = styled.table.attrs({
  cellPadding: 0,
  cellSpacing: 0
})`
  width: 100%;
  font-size: 1rem;
  text-align: center;
  
  border: 1px solid ${({theme}) => theme.color.lightGray};
  border-left: none;
  border-right: none;

  thead,
  tbody {
    display: block;
  }

  thead th {
    color: ${({theme}) => theme.color.main};
  }

  tbody,
  thead {
    td,
    th {
      width: 12rem;
      padding: 0.24rem 0;
    }

    td:first-of-type,
    th:first-of-type {
      width: 8rem;
    }

    td:last-of-type,
    th:last-of-type {
      width: 13rem;
    }
  }

  tbody {
    max-height: 10rem;
    overflow-y: auto;
    overflow-x: hidden;
    
    tr.coloredBg {
      background-color: ${({theme}) => theme.color.aliceBlue};
    }
    
    
    td.bold {
      font-weight: 600;
    }
    
    td.green {
      color: ${({theme}) => theme.color.collatGreen};
    }
    
    td.red {
      color: ${({theme}) => theme.color.collatRed};
    }
    
  }

  button {
    padding: 0.3rem 0.4rem;
    margin: 0 1px;
    border: 0;
    border-radius: ${({theme}) => theme.border.radius};
    background-color: ${({theme}) => theme.color.main};
    color: ${({theme}) => theme.color.sectionBg};
    font-size: 0.9rem;
    font-weight: 500;
    font-variant: petite-caps;

    &:hover {
      background-color: ${({theme}) => theme.color.secondary};
    }

    &:disabled {
      cursor: not-allowed;
      color: ${({theme}) => theme.color.softGray};
      background-color: ${({theme}) => theme.color.gray};
    }
  }
`

export const Block = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  position: relative;

  margin: 1rem 0;

  label {
    div:nth-child(1) {
      display: flex;
      justify-content: flex-start;
      position: relative;

      ${HelpIcon} {
        margin-left: 0.5rem;
      }
    }

    div:nth-child(2) {
      position: relative;

      span {
        color: ${({theme}) => theme.color.gray};
        font-size: 2rem;
        font-weight: 400;
        position: absolute;
        top: 0.3rem;
        right: 0.5rem;
      }
    }

    div:nth-child(3) {
      display: flex;
      justify-content: space-between;
      font-size: 0.8rem;
    }
  }

  .eth-in-usd {
    color: ${({theme}) => theme.color.gray};
    font-size: 0.8rem;
    font-style: normal;
  }

  .no-cdps-found {
    font-style: italic;
  }
`

export const NewAlertForm = styled(Block)`
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  
  p {
    width: 100%;
    margin: 0.8rem 0;
    text-align: center;
  }
  
  p:first-of-type {
    font-variant: petite-caps;
    font-size: 1.8rem;
    font-weight: 600;
    color: ${({theme}) => theme.color.main};
  }
`

const Input = styled.input`
  text-align: center;
  border: 2px solid ${({ theme }) => theme.color.softGray};
  background-color: rgba(0, 0, 0, 0.03);
  border-radius: ${({ theme }) => theme.border.radius};

  &::placeholder {
    color: ${({ theme }) => theme.color.softGray};
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`;

export const NewAlertNumberInput = styled(Input).attrs({
  type: "number"
})`
  min-width: 5rem;
  max-width: 5rem;
  font-size: 1.5rem;
  font-weight: 500;
  padding: 0;
  margin: 0;
  min-height: 2rem;
  line-height: 2rem;
  -moz-appearance: textfield;

  &:focus {
    outline: none;
    border: 2px solid ${({ theme }) => theme.color.gray};
  }

  &:after {
    margin-left: -1rem;
    content: '%';
  }  
`;

export const NewAlertEmailInput = styled(NewAlertNumberInput).attrs({
  type: "email"
})`
  min-width: 28rem;
  max-width: 28rem;
  font-size: 1.2rem;
  font-weight: 400;
`;

/*
const Input = styled.input`
  text-align: center;
  border: 2px solid ${({ theme }) => theme.color.softGray};
  background-color: rgba(0, 0, 0, 0.03);
  border-radius: ${({ theme }) => theme.border.radius};

  &::placeholder {
    color: ${({ theme }) => theme.color.softGray};
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`;
*/

/*
export const WizardNumberInput = styled(Input).attrs({
  type: "number"
})`
  max-width: 24rem;
  font-size: 2rem;
  padding: 0;
  margin: 0;
  min-height: 2.8rem;
  line-height: 2.8rem;
  -moz-appearance: textfield;

  &:focus {
    outline: none;
    border: 2px solid ${({ theme }) => theme.color.gray};
  }
`;
*/

export const Button = styled.button.attrs({
  type: 'button'
})`
  color: ${({theme}) => theme.color.sectionTag};
  border: none;
  background-color: ${({theme}) => theme.color.secondary};
  border-radius: ${({theme}) => theme.border.radius};
  text-align: center;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2rem;
  padding: 0.5rem 0.8rem;
  font-variant: petite-caps;

  &:disabled {
    cursor: not-allowed;
    color: ${({theme}) => theme.color.softGray};
    background-color: ${({theme}) => theme.color.gray};
  }
`

export const Modal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  z-index: 1000;
  background-color: ${({theme}) => theme.color.modalBg};
`

export const Dialog = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-width: 38rem;
  max-width: 38rem;
  width: 100%;

  background-color: ${({theme}) => theme.color.sectionBg};
  border: 4px solid ${({theme}) => theme.color.main};
  border-radius: ${({theme}) => theme.border.radius};

  h3 {
    font-size: 1.3rem;
  }

  p {
    margin: 0.5rem 0;
    font-size: 1.1rem;
    font-weight: 400;

    span {
      font-weight: 600;
    }
  }

  img {
    width: 6rem;
    height: 6rem;
    margin: 0.5rem 0 1rem;
  }

  img.coming-soon {
    margin: 1.5rem 0 0.5rem;
  }

  div.buttons {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 1rem 0 1.5rem;
    width: 100%;
  }

  a.tx-etherscan,
  &:visited,
  &:active {
    color: ${({theme}) => theme.color.main};
    font-size: 0.8rem;
    font-weight: 500;
    text-decoration: none;
  }
`

const DialogButton = styled(Button)`
  font-size: 1.2rem;
  line-height: 1.6rem;
  padding: 0.4rem 0.9rem;
`

export const AcceptDialogButton = styled(DialogButton)`
  background-color: ${({theme}) => theme.color.secondary};
`

export const CancelDialogButton = styled(DialogButton)`
  background-color: ${({theme}) => theme.color.softGray};
`

export const Web3ScreenStyled = styled.div`
  max-width: 30rem;
  padding: 1rem 3rem;
  margin: auto;

  text-align: center;
  color: white;

  background-color: ${({theme}) => theme.color.main};
  border: 2px solid ${({theme}) => theme.color.main};
  border-radius: ${({theme}) => theme.border.radius};

  p {
    line-height: 1.5rem;
    font-weight: 500;
  }

  a,
  &:visited {
    color: ${({theme}) => theme.color.sectionTag};
  }
`

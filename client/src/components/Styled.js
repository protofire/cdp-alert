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

    * {
      font-family: 'Roboto', sans-serif;
    }
  }
`

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;

  position: relative;
  text-align: center;

  &.home {
    * {
      color: ${({ theme }) => theme.color.white};
    }

    h2 {
      -webkit-backdrop-filter: blur(30px);
      backdrop-filter: blur(30px);
      font-size: 50px;
      font-weight: bold;
      line-height: 1.32;
      text-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
      text-transform: uppercase;
      max-width: 800px;
      margin-top: auto;
    }
    
    p {
      font-size: 30px;
      font-weight: normal;
      line-height: 1.3;
      text-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
      margin-bottom: auto;
    }

    button {
      width: 207px;
      height: 44px;
      border: solid 1px ${({ theme }) => theme.color.white};
      background-color: transparent;
      font-size: 18px;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 32px;
    }
  }
  
  &.login {
    > div {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      
      width: 400px;
      height: 520px;
      padding: 23px 0;

      background-color: ${({ theme }) => theme.color.white};
      box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.75);

      h2 {
        color: ${({ theme }) => theme.color.darkText};
        font-size: 24px;
        font-weight: bold;
        line-height: 1.33;
        text-transform: capitalize;
        margin: 0;
      }
      
      div:last-of-type {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        
        height: 360px;
      
        button {
          width: 305px;
          height: 67px;
          border: solid 1px ${({ theme }) => theme.color.darkText};
          background-color: transparent;
          color: ${({ theme }) => theme.color.darkText};
          font-weight: bold;
          position: relative;
          outline: 0;
  
          &:hover:enabled {
            border-color: ${({ theme }) => theme.color.main};
            background-color: ${({ theme }) => theme.color.main};
            color: ${({ theme }) => theme.color.white};
          }
          
          &:disabled {
            cursor: not-allowed;
          }
          
          &.demo {
            position: relative;
            font-size: 36px;
            line-height: 1.33;
          }
          
          &.metamask {
            font-size: 28px;
            line-height: 1.32;
            padding-left: 40px;
            background: url('/images/metamask.png') no-repeat 31px 14px;
            background-size: 43px 40px;
          }

          &.ledger {
            background: url('/images/ledger.png') no-repeat center center;
            background-size: 156px 42px;
          }

          &.trezor {
            background: url('/images/trezor.png') no-repeat center center;
            background-size: 158px 45px;
          }
          
          span.connected {
            font-size: 13px;
            font-weight: normal;
            line-height: 1.38;
            color: ${({ theme }) => theme.color.main};
            position: absolute;
            right: 0;
            bottom: -20px;
          }
          
          span.allowedNets {
            position: absolute;
            top: 45px;
            left: 100px;
            width: 135px;
            font-size: 11px;
            font-weight: 400;
            text-align: center;
          }
        }
      }
    }
  }
  
  &.cdps {
    padding-top: 60px;

    h2 {
      font-size: 36px;
      font-weight: bold;
      line-height: 1.33;
      color: ${({ theme }) => theme.color.darkText};
    }
    
    > div:first-of-type {
      display: flex;
      align-items: center;
      margin: 45px 0;

      span {
        margin-left: 10px;
        font-size: 22px;
        font-weight: normal;
        line-height: 1.32;
        color: ${({ theme }) => theme.color.darkText};
        
        strong.price {
          font-weight: bold;
        }
      }
    }
    
    .no-cdps-found {
      margin: auto 0;
      font-size: 22px;
      font-weight: normal;
    }
  }
`

export const WalletCdpsTable = styled.table.attrs({
  cellPadding: 0,
  cellSpacing: 0
})`
  width: 895px;
  font-size: 16px;
  font-weight: normal;
  text-align: center;
  
  thead th {
    color: ${({ theme }) => theme.color.darkText};
    font-weight: bold;
    line-height: 1.31;
  }

  tbody td {
    border-top: 1px solid ${({ theme }) => theme.color.lightGray};
  }

  tbody,
  thead {
    td,
    th {
      height: 42px;
      width: 192px;
    }

    td:first-of-type,
    th:first-of-type {
      width: 128px;
    }

    td:last-of-type,
    th:last-of-type {
      width: 208px;
    }
  }

  tbody {
    td.green {
      color: ${({ theme }) => theme.color.main};
    }
    
    td.red {
      color: ${({ theme }) => theme.color.red};
    }
  }
  
  td:last-of-type {
    div {
      display: flex;
      justify-content: space-between;
      margin: 0;
    }
  }

  button {
    font-size: 12px;
    font-weight: normal;
    line-height: 0.83;
    color: ${({ theme }) => theme.color.darkText};
    background-color: transparent;
    border: 0;
    
    &:hover {
      cursor: pointer;
    }

    &:disabled {
      cursor: not-allowed;
    }
    
    span {
      font-size: 16px;
      vertical-align: text-top;
    }
  }
`

export const NewAlertForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 895px;
  margin: auto 0 20px;
  
  p {
    font-size: 13px;
    font-weight: normal;
    line-height: 1.38;
    text-align: left;
    margin: 0;
    color: ${({ theme }) => theme.color.darkText};
    
    input:first-of-type {
      color: ${({ theme }) => theme.color.red};
    }
    
    input:last-of-type {
      color: ${({ theme }) => theme.color.main};
    }
  }
  
  > div {
    display: flex;
    justify-content: space-between;
    width: 300px;
  }
`

const Input = styled.input`
  text-align: center;
  border: 2px solid ${({ theme }) => theme.color.softGray};
  background-color: rgba(0, 0, 0, 0.03);

  &::placeholder {
    color: ${({ theme }) => theme.color.softGray};
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`

export const NewAlertNumberInput = styled(Input).attrs({
  type: 'number',
  required: true,
  step: 1
})`
  max-width: 57px;
  font-size: 20px;
  font-weight: normal;
  text-align: left;
  padding: 0 0 0 10px;
  margin: 0;
  border: 0;
  border-bottom: solid 1px ${({ theme }) => theme.color.lightGray};
  background-color: transparent;
  -moz-appearance: textfield;

  &:focus {
    outline: none;
    border-bottom-color: ${({ theme }) => theme.color.darkText};
  }
`

export const NewAlertEmailInput = styled(NewAlertNumberInput).attrs({
  type: 'email',
  required: true
})`
  min-width: 200px;
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.color.darkText};
  padding: 0 5px;
  text-align: left;
  
  &::placeholder {
    color: ${({ theme }) => theme.color.placeholder};
  }
`

const PercentWrapper = styled.span`
  margin: 0 5px 0 -16px;
`

export const Percent = () => <PercentWrapper>%</PercentWrapper>

export const Button = styled.button.attrs({
  type: 'submit'
})`
  width: 82px;
  height: 26px;
  color: ${({ theme }) => theme.color.darkText};
  background-color: transparent;
  border: solid 1px ${({ theme }) => theme.color.darkText};
  text-transform: capitalize;

  &:hover {
    cursor: pointer;
  }
  
  &:focus {
    outline:0;
  }

  &:disabled {
    cursor: not-allowed;
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
  background: rgba(0,0,0,0.1);
`

export const Dialog = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 400px;
  height: 414px;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.75);
    
  h3 {
    font-size: 24px;
    color: ${({ theme }) => theme.color.darkText};
    margin-bottom: 35px;
  }
  
  p {
    margin: 0;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.31;
    text-align: center;
    
    &:first-of-type {
      max-width: 292px;
      margin-top: 45px;
    }

    &:last-of-type {
      max-width: 260px;
      margin: 20px 0 75px;
    }
    
    &.one-line {
      max-width: 300px;
      margin: 65px 0 75px;
    }

    span.bold {
      font-weight: 600;
    }

    span.green {
      color: ${({ theme }) => theme.color.main};
    }

    span.red {
      color: ${({ theme }) => theme.color.red};
    }
  }

  button {
    width: 76px;
    height: 38px;
    font-size: 20px;
    background-color: transparent;
    border: solid 1px ${({ theme }) => theme.color.darkText};
  }
`

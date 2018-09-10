import styled from 'styled-components'

const HEADER_HEIGHT = 50

export const Layout = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  min-height: 100vh;
`

export const Header = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: ${HEADER_HEIGHT}px;
  display: flex;
  justify-content: center;
  align-items: center;

  h3 {
    position: relative;
    width: 1000px;
    text-align: left;
    margin: auto 0;
    font-size: 24px;
    font-weight: bold;
    line-height: 1.33;
    color: ${({theme}) => theme.color.white};
  }  
  
  &.black-bg {
    background-color: ${({theme}) => theme.color.darkText};
  }
`

export const Footer = styled.footer`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  margin: 0.5rem auto;
  font-weight: 400;

  > p {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 1rem 0 0;
    text-align: center;

    > span {
      color: ${({ theme }) => theme.color.heart};
      font-size: 1.5rem;
      vertical-align: sub;
    }
    
    > * {
      padding: 0 0.25em;
    }
  }
`

export const Main = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: url('/images/background.png');
  background-size: cover;

  width: 100%;
  height: 100%;
  padding-top: ${HEADER_HEIGHT}px;

  &.white-bg {
    background: ${({theme}) => theme.color.white};
  }

  hr {
    width: 200px;
    height: 0;
    margin: 1px auto 0;
    border: solid 1px ${({theme}) => theme.color.main};
  }

  button {
    cursor: pointer;
    
    &:focus {
      outline:0;
    }
  }
`

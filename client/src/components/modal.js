import styled from 'styled-components'

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
  background: rgba(0,0,0,0.5);
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
    
    &.footer   {
      margin: 50px 0;
      font-weight: bold;
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
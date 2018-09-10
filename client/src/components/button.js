import styled from 'styled-components'

export const Button = styled.button.attrs({
  type: 'submit'
})`
  min-width: 82px;
  min-height: 26px;
  color: ${({ theme }) => theme.color.darkText};
  background-color: transparent;
  border: solid 1px ${({ theme }) => theme.color.darkText};
  text-transform: capitalize;
  user-select: none;

  &:hover {
    cursor: pointer;
  }
  
  &:focus {
    outline:0;
  }

  &:disabled {
    cursor: not-allowed;
  }
  
  // Styled
  &.insurance {
    height: 44px;
    padding: 0 1.5rem;
    margin: 1rem 0 0.5rem;
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
  }
`

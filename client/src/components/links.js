import React from 'react'
import styled from 'styled-components'

import { OctocatIcon, ProtofireLogo } from './icons'

export const GithubRepoLink = styled.a.attrs({
  href: 'https://github.com/protofire/cdp-alert',
  target: '_blank',
  rel: 'noopener noreferrer'
})``

export const Github = () => (
  <GithubRepoLink>
    <OctocatIcon/>
  </GithubRepoLink>
)

const ProtofireLink = styled.a.attrs({
  href: 'https://protofire.io',
  target: '_blank',
  rel: 'noopener noreferrer'
})`
  margin-left: 0.3rem;
`

export const Protofire = () => (
  <ProtofireLink>
    <ProtofireLogo/>
  </ProtofireLink>
)

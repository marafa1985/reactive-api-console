import React from 'react'
import { ChatTitle } from './ChatTitle'

describe('<ChatTitle />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ChatTitle />)
  })
})
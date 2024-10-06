import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

function render(ui: React.ReactElement, options = {}) {
  return {
    user: userEvent.setup(),
    ...rtlRender(ui, {
      wrapper: ({ children }) => children,
      ...options,
    }),
  }
}

export * from '@testing-library/react'
export { render, userEvent } 
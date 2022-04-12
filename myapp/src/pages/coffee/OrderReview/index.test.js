import React from 'react'
import { render, screen} from'@testing-library/react'
import OrderReview from "./";

test('renders', () => {
  render(<OrderReview products={[]}/>)
  const message = screen.getByText('Checkout');
  expect(message).toBeInTheDocument();
})

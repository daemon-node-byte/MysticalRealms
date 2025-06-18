import { render, screen } from '@testing-library/react';
import React from 'react';

// Dummy SampleComponent for demonstration
function SampleComponent() {
  return <div>sample component</div>;
}

test('renders sample text', () => {
  render(<SampleComponent />);
  expect(screen.getByText(/sample/i)).toBeInTheDocument();
});

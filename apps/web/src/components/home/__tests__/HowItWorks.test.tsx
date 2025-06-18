import { render, screen } from '@testing-library/react';
import { HowItWorks } from '../HowItWorks';

describe('HowItWorks', () => {
  it('renders all steps', () => {
    render(<HowItWorks />);
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByText('Choose a Service')).toBeInTheDocument();
    expect(screen.getByText('Receive Insight')).toBeInTheDocument();
  });
});

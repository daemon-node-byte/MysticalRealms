import React from 'react';
import { Theme } from '@radix-ui/themes';
 
type Props = { 
    children: React.ReactElement | React.ReactNode
}

function SiteTheme ({ children }: Props): React.ReactElement {
  // Accept theme as prop in future for dynamic switching
  // For now, just pass children through
  return <Theme>{children}</Theme>;
};

export default SiteTheme;
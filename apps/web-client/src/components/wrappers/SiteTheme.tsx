import React from 'react'
import { Theme } from '@radix-ui/themes'
 
type Props = { 
    children: React.ReactElement | React.ReactNode
}

function SiteTheme ({ children }: Props): React.ReactElement { 
    return (
        <Theme>
            {children}
        </Theme>
    )
};

export default SiteTheme;
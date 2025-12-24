/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import type { Metadata } from 'next'

import config from '@payload-config'
import { RootLayout as PayloadRootLayout } from '@payloadcms/next/layouts'
import { handleServerFunctions } from '@payloadcms/next/utilities'
import React from 'react'

import '@payloadcms/next/css'

export function generateMetadata(): Promise<Metadata> {
    return handleServerFunctions({
        config,
        importHook: import('@payload-config'),
    })
}

const Layout = ({ children }: { children: React.ReactNode }) => (
    <PayloadRootLayout config={config} importHook={import('@payload-config')}>
        {children}
    </PayloadRootLayout>
)

export default Layout

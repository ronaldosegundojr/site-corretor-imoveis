/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import type { Metadata } from 'next'

import config from '@payload-config'
import { RootPage as PayloadRootPage } from '@payloadcms/next/views'
import { handleServerFunctions } from '@payloadcms/next/utilities'
import React from 'react'

type Args = {
    params: Promise<{
        segments: string[]
    }>
    searchParams: Promise<{
        [key: string]: string | string[]
    }>
}

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
    handleServerFunctions({
        args: {
            params,
            searchParams,
        },
        config,
        importHook: import('@payload-config'),
    })

const Page = ({ params, searchParams }: Args) => (
    <PayloadRootPage
        config={config}
        importHook={import('@payload-config')}
        params={params}
        searchParams={searchParams}
    />
)

export default Page

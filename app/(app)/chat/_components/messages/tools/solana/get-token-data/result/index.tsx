'use client'

import React from 'react'

import GetTokenDataResultHeading from './heading';
import Links from './links';

import type { GetTokenDataResultBodyType } from '@/ai';

interface Props {
    body: GetTokenDataResultBodyType
}

const GetTokenDataResult: React.FC<Props> = ({ body }) => {
    const { token, pairs } = body;

    const topPair = pairs[0];

    return (
        <div className="flex flex-col gap-2 w-full">
            <GetTokenDataResultHeading token={token} topPair={topPair.pair} />
            <Links topPair={topPair.pair} />
        </div>
    )
}

export default GetTokenDataResult;

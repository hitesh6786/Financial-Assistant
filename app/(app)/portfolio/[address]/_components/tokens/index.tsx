"use client"

import React from 'react'

import { Coins } from 'lucide-react';

import Decimal from 'decimal.js';

import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    Card,
    Button
} from '@/components/ui'

import { Portfolio } from '@/services/birdeye';
import { useSwapModal } from '../../_contexts/use-swap-modal';

interface Props {
    portfolio: Portfolio
}

const Tokens: React.FC<Props> = ({ portfolio }) => {

    const { openSell, openBuy } = useSwapModal();

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4" />
                    <h2 className="text-lg font-bold">
                        Tokens
                    </h2>
                </div>
                <p>
                    ${portfolio.totalUsd.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                </p>
            </div>
            <Card className="p-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">Asset</TableHead>
                            <TableHead>Balance</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-right">Value</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="max-h-96 overflow-y-auto">
                        {
                            portfolio.items.filter((token) => Number(token.balance) > 0 && token.logoURI && token.symbol && token.priceUsd && token.valueUsd).map((token) => (
                                <TableRow key={token.address}>
                                    <TableCell>
                                        <div className="font-medium flex gap-2 items-center">
                                            <img
                                                src={token.logoURI}
                                                alt={token.name}
                                                className="w-4 h-4 rounded-full"
                                            />
                                            <p>
                                                {token.symbol}
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {new Decimal(token.balance).div(10 ** token.decimals).toNumber().toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                                    </TableCell>
                                    <TableCell>
                                        ${token.priceUsd.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        ${token.valueUsd.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                                    </TableCell>
                                    <TableCell className="flex items-center gap-2 justify-end">
                                        <Button variant="outline" onClick={() => openSell(token.address === 'So11111111111111111111111111111111111111111' ? 'So11111111111111111111111111111111111111112' : token.address)}>
                                            Sell
                                        </Button>
                                        <Button variant="brand" onClick={() => openBuy(token.address === 'So11111111111111111111111111111111111111111' ? 'So11111111111111111111111111111111111111112' : token.address)}>
                                            Buy
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}

export default Tokens
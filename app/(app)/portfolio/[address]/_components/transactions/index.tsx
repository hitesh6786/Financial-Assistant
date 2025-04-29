import React from 'react'

import {
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui';

import type { EnrichedTransaction } from 'helius-sdk';
import TransactionHash from '@/app/_components/transaction-hash';
import { ArrowLeftRight } from 'lucide-react';
import TokenTransfer from './token-transfer';

interface Props {
    transactions: EnrichedTransaction[];
    address: string;
}

const Transactions: React.FC<Props> = ({ transactions, address }) => {


    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <ArrowLeftRight
                    className="w-4 h-4"
                />
                <h2 className="text-lg font-bold">Transactions</h2>
            </div>
            <Card className="p-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tx Hash</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Source</TableHead>
                            <TableHead>Balance Changes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="max-h-96 overflow-y-hidden">
                        {
                            transactions.map((transaction) => (
                                <TableRow key={transaction.signature}>
                                    <TableCell>
                                        <TransactionHash
                                            hash={transaction.signature}
                                            hideTransactionText
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {transaction.type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                                    </TableCell>
                                    <TableCell>
                                        {transaction.source.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                                    </TableCell>
                                    <TableCell>
                                        {transaction.tokenTransfers?.map((tokenTransfer, index) => (
                                            <TokenTransfer
                                                key={index}
                                                tokenTransfer={tokenTransfer}
                                                address={address}
                                            />
                                        ))}
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

export default Transactions
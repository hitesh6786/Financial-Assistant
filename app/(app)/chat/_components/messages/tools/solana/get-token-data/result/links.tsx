'use client'

import React from 'react'

import Link from 'next/link';

import { AlertCircle } from 'lucide-react'

import { DexScreenerPair } from '@/services/dexscreener/types'
import { Card } from '@/components/ui';

interface Props {
    topPair: DexScreenerPair
}

const Links: React.FC<Props> = ({ topPair }) => {
    return (
        <div className="grid grid-cols-2 gap-2 w-full">
            <Card className="p-2 flex flex-col gap-2 overflow-hidden">
                <h3 className="text-md font-bold">
                    Websites
                </h3>
                {
                    topPair.info ? (
                        <div className="flex flex-col gap-2 overflow-hidden">
                            {
                                topPair.info.websites?.map((website) => (
                                    <Link 
                                        href={website.url} 
                                        target="_blank" 
                                        className="text-sm text-brand-600 hover:text-primary truncate" 
                                        key={website.url}
                                    >
                                        {website.url.replace("https://", "")}
                                    </Link>
                                )) ?? (
                                    <div className="flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4 text-orange-500" />
                                        <p className="text-sm text-muted-foreground">No links found</p>
                                    </div>
                                )
                            }
                        </div>
                    ) : (
                        <p>No links found</p>
                    )
                }
            </Card>
            <Card className="p-2 flex flex-col gap-2">
                <h3 className="text-md font-bold">
                    Socials
                </h3>
                {
                    topPair.info?.socials ? (
                        <div className="flex flex-col gap-2">
                            {
                                topPair.info.socials?.map((social) => (
                                    <p 
                                        key={social.url}
                                        className="text-sm text-muted-foreground"
                                    >
                                        {social.type[0].toUpperCase() + social.type.slice(1)}: <Link href={social.url} target="_blank" className="text-brand-600 hover:text-primary">{social.url.split("/").pop()}</Link>
                                    </p>
                                ))
                            }
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-orange-500" />
                            <p className="text-sm text-muted-foreground">No socials found</p>
                        </div>
                    )
                }
            </Card>
        </div>
    )
}

export default Links
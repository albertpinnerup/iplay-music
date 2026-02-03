'use client';

import { Spinner } from '@/components/ui/spinner';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from './ui/empty';
import { Button } from './ui/button';

export default function LoadingOverlay() {
    // return (
    //     <Empty
    //         className='fixed inset-0 z-50 grid place-items-center'
    //         role='status'
    //         aria-live='polite'
    //     >
    //         {/* blur + dim */}
    //         <div className='absolute inset-0 bg-background/45 backdrop-blur-xs' />
    //
    //         {/* spinner card */}
    //         <Spinner className='size-16' />
    //         <EmptyTitle>Processing your request</EmptyTitle>
    //     </Empty>
    // );

    return (
        <>
            <Empty className='w-full fixed inset-0 z-50 grid place-items-center'>
                <EmptyHeader>
                    <EmptyMedia>
                        <Spinner className='size-16' />
                    </EmptyMedia>
                    <EmptyTitle>Please wait...</EmptyTitle>
                </EmptyHeader>
            </Empty>
            <div className='absolute inset-0 bg-background/45 backdrop-blur-xs' />
        </>
    );
}

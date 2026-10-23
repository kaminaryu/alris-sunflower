'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { animate } from 'animejs';
import Leaf from '@/models/leaf';
import Sunflower from '@/models/sunflower'
import { useRouter } from 'next/navigation';
import Cloud from '@/models/cloud';

export default function Home() {
    const sunflowerRef = useRef<HTMLImageElement>(null);
    const router = useRouter();

    useEffect(() => {
        const growAnime = animate(sunflowerRef.current!, {
            scale: [0, 1],
            opacity: [0, 1],
            duration: 2000,
            ease: 'outBack',
        });

        const swayAnime = animate(sunflowerRef.current!, {
            rotate: [-3, 3],
            duration: 2500,
            delay: 2000,
            ease: 'inOutSine',
            loop: true,
            alternate: true,
        });

        return () => {
            growAnime.revert();
            swayAnime.revert();
        };
    }, []);


    useEffect(() => {
        const floatingCloudAnime = animate('.cloud', {
            y: [-10, 10],
            duration: 2000,
            ease: 'inOutQuad',
            loop: true,
            alternate: true,
        })

        return () => {
            floatingCloudAnime.revert();
        }
    }, [])

    return (
        <main className='flex min-h-screen items-end justify-center overflow-hidden bg-indigo-950'>
            <div 
                ref={sunflowerRef} 
                className='relative aspect-[357/744] w-[min(43vh,72vw)] max-w-[520px]'
                style={{ opacity: 1, transformOrigin: '50% 100%', zIndex: '1' }}
            >

                <Sunflower />

                <Leaf
                    src={"/PomodoroLeaf.svg"}
                    x={55}
                    y={30}
                    originX={10}
                    originY={70}
                    onClick={() => router.push("/pomodoro")}
                />

                <Leaf 
                    src="/ToDoLeaf.svg"
                    x={5}
                    y={10}
                    originX={90}
                    originY={70}
                    onClick={() => router.push("/todo")}
                />

            </div>

            <Cloud />

            <Image
                src="Cloud2.svg"
                alt="Cloud"
                width={440}
                height={258}
                className='cloud fixed right-[clamp(0.5rem,8vw,7.5rem)] top-[clamp(0.5rem,6vh,2.5rem)] w-[clamp(96px,18vw,300px)] h-auto'
            />
        </main>
    );
}

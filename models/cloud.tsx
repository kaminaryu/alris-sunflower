import { animate } from 'animejs';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function Cloud() {
    const cloudRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const cloudDriftingAnim = animate(cloudRef.current!, {
            x: ["-30vw", "100vw"],
            duration: 10000,
            ease: "linear",
            onComplete: () => cloudRef.current?.remove()
        })

        const floatingCloudAnime = animate(cloudRef.current!, {
            y: [-10, 10],
            duration: 2000,
            ease: 'inOutQuad',
            loop: true,
            alternate: true,
        })

        return () => {
            cloudDriftingAnim.play()
            floatingCloudAnime.play()
        }
    }, []);

    return (
        <Image
            ref={cloudRef}
            src="Cloud1.svg"
            alt="Cloud"
            width={398}
            height={259}
            className='fixed left-[clamp(0.5rem,8vw,7.5rem)] top-[clamp(0.5rem,6vh,2.5rem)] w-[clamp(96px,18vw,300px)] h-auto'
        />
    )
}

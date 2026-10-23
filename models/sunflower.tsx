import Image from 'next/image';

export default function Sunflower() {
    return( 
        <Image
            src="/SunflowerLeafless.svg"
            alt="Sunflower"
            fill
            className='absolute object-contain'
        />
    )
}

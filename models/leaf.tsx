import Image from "next/image"

interface LeafProp {
    src: string,
    x: number,
    y: number,
    originX: number,
    originY: number,
    onClick: VoidFunction,
}

export default function Leaf({ src, x, y, originX, originY, onClick }: LeafProp) {
    return (
        <Image
            src={src}
            alt="Leaf"
            onClick={onClick}
            width={200}
            height={100}
            className={`
                absolute cursor-pointer w-[56%] h-auto
                hover:scale-110 
                transition-transform duration-500
            `}
            style={{
                left: `${x}%`,
                bottom: `${y}%`,
                transformOrigin: `${originX}% ${originY}%`
            }}
        />
    )
}

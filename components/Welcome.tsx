import Image from "next/image";

const Welcome = () => {
    return (
        <div className="w-full bg-sveBlue flex flex-col items-center pt-8">
            <h1 className="font-serif font-bold text-5xl text-sveYellow">
                SVE
            </h1>
            <h2 className="font-sans font-bold text-xl text-primary">
                Floorball
            </h2>
            <Image src="/logo.png" alt="logo" width={256} height={256} />
        </div>
    );
};

export default Welcome;
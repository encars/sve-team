import Image from "next/image";

const Welcome = () => {
    return (
        <div className="w-full bg-primary flex flex-col md:flex-row md:justify-center md:space-x-16 items-center pt-8">
            <div className="flex flex-col items-center">
                <h1 className="font-serif font-bold text-5xl text-sveYellow">
                    SVE
                </h1>
                <h2 className="font-sans font-bold text-xl text-sveBlue">
                    Floorball
                </h2>
            </div>
            <Image src="/welcomeLogo.png" alt="logo" width={256} height={256} />
        </div>
    );
};

export default Welcome;
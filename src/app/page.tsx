import { Button } from "@/components/ui/button";
import Image from "next/image"; 

export default function Home() {
  return (
    <div className="relative flex w-full min-h-screen flex-col items-center justify-center">
      {/* HERO */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/Images/hero1.png"
          alt="B-films hero image"
          layout="fill" 
          objectFit="cover" 
          quality={100} 
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white p-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Upptäck de bästa B-filmerna
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-6">
            Dyk in i en värld av underliga, skrämmande och fantastiskt
            underhållande filmer som aldrig gjorde det till A-lista.
          </p>
          <Button
            variant="secondary"
            className="text-lg md:text-xl px-6 py-3"
          >
            Se top 5 filmer -&gt;
          </Button>
        </div>
      </div>
      {/* UTANFÖR HERO */}
      <div className="relative z-10 p-24">
        {/* RESTEN HÄR EXEMPEL TOP LISTOR OCH BILDSPEL  */}
      </div>
    </div>
  );
}
// Detta är en kladd som vi får skriva i när projectet börjar komma mot sitt slut,
// här kan vi ladda upp bilder och länkar  till linked in och githup och vårat cv hemsida.
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Globe } from "lucide-react"; // Using Lucide-React for modern icons

const members = [
  {
    name: "Josefine",
    role: "Fullstack utvecklare med fokus på frontend, Grafisk/webbdesigner",
    bio: "Ansvarig för UI-komponenter och att implementera responsiv design. Byggde filmkorten och navigeringsmenyn. Bygt varukorg med lokal lagring och kassa men även en del admin sidor som genere och orders. Zod validering. ",
    image: "/path/to/josefine.jpg",
    github: "GITHUBLÄNK",
    linkedin: "LINKEDIN",
    website: "WEBBSIDA",
  },
  {
    name: "Niklas",
    role: "Fullstack utvecklare med fokus på Backend & API Specialist",
    bio: "Skapade och hanterade filmdata-API:erna. Ansvarig för backend-logik och integrationen med databasen. Byggt  admin för person skrivit prisma schema och zod validering.",
    image: "/path/to/Niklas.jpg",
    github: "GITHUBLÄNK",
    linkedin: "LINKEDIN",
    website: "WEBBSIDA",
  },
  {
    name: "Amina",
    role: "Fullstack utvecklare",
    bio: "Ansvarart för Admin movies och autentisering. Implementerade säkerhetsåtgärder och användarhantering.",
    image: "/path/to/Amina.jpg",
    github: "GITHUBLÄNK",
    linkedin: "LINKEDIN",
    website: "WEBBSIDA",
  },
];

export default function AboutUs() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
        Om Oss
      </h1>

      <div className="space-y-16">
        {members.map((member, index) => (
          <div
            key={member.name}
            className={`flex flex-col md:flex-row items-center gap-8 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Text Section */}
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-semibold mb-2">{member.name}</h2>
              <p className="text-lg text-muted-foreground mb-4">
                {member.role}
              </p>
              <p className="text-base leading-relaxed">{member.bio}</p>
            </div>

            {/* Image and Social Links Section */}
            <div className="w-full md:w-1/2 flex flex-col items-center">
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <div className="flex gap-4 mt-2">
                {member.github && (
                  <Link
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github
                      size={28}
                      className="text-primary hover:text-primary-foreground transition-colors"
                    />
                  </Link>
                )}
                {member.linkedin && (
                  <Link
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin
                      size={28}
                      className="text-primary hover:text-primary-foreground transition-colors"
                    />
                  </Link>
                )}
                {member.website && (
                  <Link
                    href={member.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe
                      size={28}
                      className="text-primary hover:text-primary-foreground transition-colors"
                    />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

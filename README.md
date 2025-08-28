##  MovieShop Teknisk Specifikation
• Projektöversikt
• MovieShop är en e-handelsplattform för att köpa och hantera filmer. Projektet kommer att utvecklas av grupper på 4–5 studenter.
• Teknisk stack
• NextJS 15 med App Router
• PostgreSQL
• Prisma (ORM)
• Tailwind CSS (Styling)
• ShadCN (UI-komponenter)
• Better Auth (Autentisering)
• Zod (Datavalidering)
• Kärnfunktioner
______________________________________________________________
1. Användarautentisering
Implementera registrering och inloggning med Better Auth
Använd Better Auths standardschema för användardata
Skapa användarroller: Kund och Admin (valfritt)
______________________________________________________________
2. Filhantering (Admin)
CRUD-operationer för filmer:
Lägg till nya filmer med detaljer (titel, beskrivning, pris, releasedatum, regissör, skådespelare osv.)
Redigera befintlig filminformation
Ta bort filmer
Lista alla filmer med paginering (valfritt)
Genrer:
CRUD-operationer för genrer
Tilldela filmer till flera genrer
Personer kopplade till filmer:
Lägg till och redigera information om regissörer och skådespelare
Associera personer med filmer i olika roller (regissör, skådespelare)
______________________________________________________________
3. Köpupplevelse (Kund)
Startsida
Topp 5 mest köpta filmer
Topp 5 senaste filmer
Topp 5 äldsta filmer
Topp 5 billigaste filmer

Bläddra filmer (valfria filter)
Efter genre
Efter regissör
Efter skådespelare
Sökfunktion (grundläggande sökning på titel)
Detaljvy för filmer
Kundvagn
Lägg till filmer (lagras i cookies)
Hantera kundvagn (lägg till, ta bort, uppdatera antal)
Kassa
Ange adress
Betalningssimulering (ingen riktig betalningslösning krävs)
Orderbekräftelse
______________________________________________________________
4. Användarpanel
Se orderhistorik
Hantera kontoinformation (valfritt)
______________________________________________________________
5. Adminpanel (valfritt)
Visa försäljningsstatistik
Hantera användarkonton (med Better Auth)

## Databasmodeller (exempel på möjliga attribut)
Film: title, description, price, releaseDate, imageUrl, stock, runtime
Genre: name, description
Order: userId (referens till Better Auth-användare), totalAmount, status, orderDate
OrderItem: orderId, movieId, quantity, priceAtPurchase

## Server Actions och datavalidering
Implementera server actions för alla datamodifieringar:
Film-CRUD
Genrer
Kundvagnsoperationer (lägg till, ta bort, uppdatera)
Kassaprocess
Orderhantering
Använd Zod för serverside-validering

## Kundvagnsimplementation
Använd cookies för att lagra kundvagn
Implementera funktioner för att lägga till, ta bort och uppdatera varor

## Frontend
Responsiv design med Tailwind CSS och ShadCN
Återanvändbara React-komponenter för UI
Använd React Server Components där det är lämpligt för bättre prestanda

## Extra funktioner (endast om tid finns)
Avancerad filtrering (t.ex. årtal, speltid, flera genrer)
Användarrecensioner och betyg
Önskelista
Enkel rekommendationsmotor (baserad på köp, favoritgenrer, regissörer/skådespelare)
Filmtrailers (YouTube-embeds)
Social delning (knappar för sociala medier)
Avancerad sökning (PostgreSQL fulltext + sökning på regissör, skådespelare, genre)
Rabattsystem (enkla kampanjkoder)

## Utvärderingskriterier
Funktionalitet: Alla kärnfunktioner fungerar
Kodkvalitet: Ren, välstrukturerad och kommenterad kod
Databasschema: Effektivt med Prisma
UI/UX: Intuitiv, responsiv design med Tailwind & ShadCN
Autentisering: Säker hantering av autentisering och behörigheter
Server Actions: Effektiva och säkra datamodifieringar
Datavalidering: Korrekt användning av Zod
Kundvagn: Rätt implementation med cookies
Felhante­ring: Robust hantering med bra återkoppling
Extra funktioner: Implementerade om möjligt (ej krav)
Teamarbete: Effektivt samarbete och uppgiftsfördelning
______________________________________________________________


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

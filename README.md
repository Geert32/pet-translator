# Pet Translator

Een Angular applicatie om te communiceren met huisdieren.

## Installatie & Setup

Repository clonen:

```bash
git clone https://github.com/Geert32/pet-translator.git
cd pet-translator
```

Dependencies installeren:

```bash
npm install
```

Applicatie starten:

```bash
npm start
```

De app draait op http://localhost:4200.

## Testing

Om de geautomatiseerde unit tests uit te voeren:

```bash
npm test
```

## Architecture

Er is gekozen voor een eenvoudige architectuur met twee domeinen:

- shared: bevat alle services, models en pipes
- translator: bestaat uit feature en ui componenten

de architectuur wordt bewaakt door sheriff, deze zorgt dat domeinen niet zomaar elkaar kunnen gebruiken.

**Notes:**

- De applicatie maakt geen gebruik meer van zonejs voor change detection
- De applicatie maakt gebruik van de experimentele signal forms

## Known issues

- initiele selectie van dropdowns kan nog wel is fout gaan. zorg dat je een keuze maakt voordat je op vertalen klikt.

FußballFinder - Web-App zur Suche von Fußballplätzen
Eine adaptive Web-App zur Entdeckung, Bewertung und zum Vorschlagen von Fußball-Locations. Inklusive interaktiver Karte, Filterfunktionen und Nutzer-Authentifizierung.

Projekt-Kontext: Dieses Projekt wurde als Semesterarbeit im Sommersemester 2025 an der Hochschule Mainz zum Thema "App für Lieblingssport" entwickelt.

✨ Key Features
📍 Interaktive Karte: Anzeige aller Locations mit Leaflet.

🔍 Suche & Filter: Detaillierte Suche nach Name, Stadt sowie Filter nach Größe, Bewertung, Kosten und Ausstattung (z.B. Tribüne, Barrierefreiheit).

👤 Nutzer-System:

Gäste: Können Locations ansehen und suchen.

Registrierte Nutzer: Können Locations vorschlagen, bewerten und als Favoriten speichern.

🔒 Admin-Panel: Administratoren können vorgeschlagene Orte prüfen und freigeben.

📱 Adaptives Design: Voll funktionsfähig auf Desktop, Tablets und Smartphones dank Tailwind CSS.

🚌 Nahverkehrsintegration: Direkte Weiterleitung zu Google Maps für die Routenplanung mit öffentlichen Verkehrsmitteln.

🛠️ Tech Stack
Frontend:

React (mit Vite)

TypeScript

React Router für das Routing

Leaflet & React-Leaflet für die interaktive Karte

Tailwind CSS für das Styling

fetch API für API-Anfragen

Backend:

Node.js mit Express.js

MySQL als Datenbank

JWT (JSON Web Tokens) für die Authentifizierung

bcrypt.js zum Hashen von Passwörtern

🚀 Setup und lokale Installation
Backend starten:

# In den 'backend'-Ordner navigieren
cd backend

# Abhängigkeiten installieren
npm install

# Eine .env-Datei basierend auf .env.example erstellen und die Datenbank-Zugangsdaten eintragen

# Den Server starten
npm run dev

Frontend starten:

# In einem neuen Terminal in den 'frontend'-Ordner navigieren
cd frontend

# Abhängigkeiten installieren
npm install

# Die Vite-Entwicklungsumgebung starten
npm run dev

Das Frontend ist jetzt unter http://localhost:5173 (oder einem ähnlichen Port) erreichbar und mit dem Backend verbunden.

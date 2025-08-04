# ⚽ FussballFinder

**FussballFinder** ist eine interaktive Web-Anwendung zur Entdeckung, Bewertung und zum Speichern von Fußballplätzen. Nutzer können Plätze in ihrer Umgebung finden, nach verschiedenen Kriterien filtern und ihre Lieblingsplätze als Favoriten speichern.

Das Projekt wurde im Rahmen des Sommersemesters 2025 an der Hochschule Mainz entwickelt.

---

## ⭐ Features

- **Interaktive Kartenansicht:** Alle Fußballplätze werden auf einer dynamischen Karte (Leaflet) angezeigt.
- **Detaillierte Such- und Filterfunktionen:** Suchen Sie nach Orten nach Name oder Stadt und filtern Sie nach Größe, Bewertung, Kosten, Barrierefreiheit und mehr.
- **Benutzer-Authentifizierung:** Sicherer Login und Registrierung für Nutzer mittels JWT (JSON Web Tokens).
- **Bewertungs- und Favoritensystem:** Angemeldete Nutzer können Plätze bewerten und persönliche Favoritenlisten anlegen.
- **Orte vorschlagen:** Nutzer können neue Fußballplätze vorschlagen, die dann von einem Admin freigeschaltet werden müssen.
- **Admin-Dashboard:** Ein eigener Bereich für Administratoren zur Verwaltung und Freischaltung von neu vorgeschlagenen Orten.
- **Responsives Design:** Die Anwendung ist für die Nutzung auf Desktops, Tablets und Smartphones optimiert.

---

## 🛠️ Verwendete Technologien

**Das Projekt ist als Full-Stack-Anwendung mit separatem Frontend und Backend aufgebaut.**

### Frontend (`/frontend`)
- **Framework:** React 18 mit TypeScript
- **Build-Tool:** Vite
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS
- **Karten:** Leaflet & React-Leaflet
- **State Management:** React Context API für die Authentifizierung

### Backend (`/backend`)
- **Framework:** Node.js mit Express.js
- **Datenbank:** MySQL mit mysql2/promise
- **Authentifizierung:** JSON Web Tokens (jsonwebtoken) & bcryptjs zur Passwort-Verschlüsselung
- **Testing:** Jest für Unit-Tests

---

## 🚀 Setup und Installation

Um das Projekt lokal auszuführen, folgen Sie diesen Schritten:

### Voraussetzungen

- **Node.js** (Version 14 oder höher)
- **Ein laufender MySQL-Server**

### 1. Repository klonen

```bash
git clone https://github.com/farahobe/FussballFinder.git
cd FussballFinder
```

### 2. Backend einrichten

Navigieren Sie in den Backend-Ordner:

```bash
cd backend
```

Installieren Sie die Abhängigkeiten:

```bash
npm install
```

Erstellen Sie eine `.env`-Datei basierend auf der `.env.example`-Datei und tragen Sie Ihre MySQL-Datenbank-Zugangsdaten ein.

Importieren Sie die Datenbank-Struktur aus der `/sql/fussballapp.sql`-Datei in Ihre MySQL-Datenbank.

Starten Sie den Backend-Server:

```bash
npm start
```

Der Server läuft nun auf [http://localhost:3000](http://localhost:3000).

### 3. Frontend einrichten

Öffnen Sie ein neues Terminal und navigieren Sie in den Frontend-Ordner:

```bash
cd frontend
```

Installieren Sie die Abhängigkeiten:

```bash
npm install
```

Starten Sie die Frontend-Anwendung:

```bash
npm run dev
```

Die Anwendung ist nun unter [http://localhost:5173](http://localhost:5173) (oder einem ähnlichen Port) erreichbar und verbindet sich automatisch mit dem Backend.

---



# FUTURE_FS_01 – Pavani's 3D Portfolio

A 3D-style personal portfolio website with a Node.js + Express backend, showing your projects and a functional contact form.

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- UI: 3D tilt, glassmorphism, animated background
- Backend: Node.js, Express
- Data: In-memory projects list (`projectsData.js`)

## Features

- Hero section introducing **Pavani** as a Full Stack & ML‑oriented engineer from Bangalore.
- About and Skills sections highlighting MERN, backend, ML/MLOps, and tooling.
- Projects section loaded dynamically from `/api/projects` (backend JSON).
- Contact form posting to `/api/contact` with validation and status messages.

## Project Structure

FUTURE_FS_01/
├─ server.js
├─ projectsData.js
├─ package.json
└─ public/
├─ index.html
├─ styles.css
└─ script.js

## Running Locally

1. Clone the repository:

git clone https://github.com/pavani-n-hash/FUTURE_FS_01.git
cd FUTURE_FS_01

text

2. Install dependencies:

npm install

text

3. Start the server:

npm start

text

4. Open in your browser:

http://localhost:3000

text

## API Endpoints

- `GET /api/projects`  
Returns the list of portfolio projects from `projectsData.js`.

- `POST /api/contact`  
Accepts JSON `{ name, email, message }`, validates fields, and logs the contact request on the server.

## Live Demo

https://pavani-portfolio-dzrn.onrender.com
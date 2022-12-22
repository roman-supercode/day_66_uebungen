import http from 'http';
import fs from 'fs';
// Erstelle dir mit Hilfe von Node.js einen einfachen Server
// Dieser sollte aus mindestens vier verschiedenen Seiten bestehen
// zB home, about, contact, faq
// Stelle sicher, dass alle Seiten erreichbar sind



// Dieser Code stellt eine Funktion namens sendFile bereit, die eine Datei an eine HTTP-Antwort sendet. 
// Die Funktion nimmt zwei Argumente entgegen:
// 1. path: Der Pfad zur Datei, die gesendet werden soll.
// 2. response: Ein Objekt, das die HTTP-Antwort darstellt.
// Die Funktion verwendet dann die fs (File System)-Bibliothek, um die Datei zu lesen, die sich an dem angegebenen Pfad befindet. 
// Wenn beim Lesen der Datei ein Fehler auftritt, wird der Text "error" an die Antwort gesendet. 
// Andernfalls wird der Inhalt der Datei als Text an die Antwort gesendet.
const sendFile = (path, response) => {
    fs.readFile(path, (err, data) => {
        if (err) {
            response.end('error');
            return;
        }
        response.end(data.toString());
    });
};

// 1. Server aufsetzen
const server = http.createServer((request, response) => {
    console.log("Ein Request:", request.method, request.url);

    if (request.url === "/") {
        sendFile("./assets/index.html", response);
    }
    else {
        const filePath = "./assets" + request.url;
        sendFile(filePath, response);
    }
});

// Startet einen HTTP-Server, der auf dem angegebenen Port lauscht. 
// Der Server wird auf Port 6666 gestartet und gibt in der Konsole die Meldung "Server läuft auf Port 6666" aus, sobald er bereit ist, Anfragen entgegenzunehmen.
// Syntax: server.listen(port, [hostname], [backlog], [callback])
server.listen(9999, () => console.log("Server läuft auf Port 9999"));


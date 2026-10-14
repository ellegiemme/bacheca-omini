# Bacheca degli Omini

Catalogo personale per collezionisti di minifigure: tutti gli omini di Harry Potter e Animali Fantastici e di Marvel (Avengers, Spider-Man, Guardiani della Galassia, X-Men e altri), con completamento della collezione, varianti per personaggio, rarità stimata, completezza per set e riconoscimento da foto.

Progetto personale e non commerciale. LEGO® è un marchio del Gruppo LEGO, che non sponsorizza, autorizza né approva questo progetto.

## Struttura

- `index.html` — l'app (pagina singola).
- `data/catalogo.json` — il catalogo: collezioni, omini e set, generato dai file di Rebrickable.
- `functions/api/riconosci.js` — funzione Cloudflare che riceve la foto e la inoltra a Brickognize per il riconoscimento.

## Fonti

- Dati e immagini del catalogo: [Rebrickable](https://rebrickable.com/downloads/).
- Riconoscimento delle foto: [Brickognize](https://brickognize.com/).

## Pubblicazione su Cloudflare Pages

1. Cloudflare → Workers & Pages → Create → Pages → Connect to Git.
2. Scegli il repository `bacheca-omini`.
3. Impostazioni di build: Framework preset **None**, Build command **vuoto**, Build output directory **/** (oppure lascia vuoto).
4. Save and Deploy.

Ogni modifica caricata su GitHub viene ripubblicata automaticamente.

## Note

- La collezione è salvata nel browser di chi la usa (localStorage): cambiando dispositivo o cancellando i dati del browser si riparte da zero.
- La rarità è un indicatore calcolato dai dati (numero di set che contengono l'omino, anno di uscita, dimensione dei set, serie da collezione), non un prezzo di mercato.

const express = require('express');
const cors = require('cors');
const usrRouter = require('../router/useRouter');
const {connect} = require("../db/db")
const app = express();
// app.use(express.json()); è un'espressione comune utilizzata nelle applicazioni Express.js per aggiungere il middleware express.json(). Questo middleware analizza i corpi delle richieste in entrata codificati come JSON.

// Ecco cosa fa in dettaglio:

// Analisi del corpo della richiesta: Quando invii una richiesta HTTP (ad esempio, una richiesta POST) con un payload JSON, express.json() analizza automaticamente il corpo della richiesta e converte la stringa JSON in un oggetto JavaScript. Successivamente, questo oggetto diventa accessibile attraverso req.body nella tua rotta o nel middleware.

// Content-Type Header: Il middleware express.json() guarda l'header Content-Type della richiesta in entrata. Se il valore è application/json, allora analizzerà il corpo come JSON.
// Un middleware in Express.js (e in molti altri framework web) è una funzione che ha accesso agli oggetti di richiesta (request), risposta (response) e alla funzione next nel ciclo di richiesta/risposta delle applicazioni Express. La funzione next è una funzione nel ciclo di richiesta/risposta Express, che, quando viene chiamata, passa il controllo al middleware successivo.

// Un middleware può eseguire diverse operazioni come:

// Eseguire qualsiasi tipo di codice.
// Modificare la richiesta e gli oggetti di risposta.
// Terminare il ciclo di richiesta/risposta.
// Chiamare il middleware successivo nella pila.
// Se il middleware corrente non termina il ciclo di richiesta/risposta, esso deve chiamare next() per passare il controllo al middleware successivo. Altrimenti, la richiesta rimarrà appesa.
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// L'espressione app.use((req, res, next) => {...}); in Express.js definisce un middleware. La funzione all'interno di app.use prende tre parametri: req, res e next. Questi rappresentano rispettivamente:

// req: L'oggetto della richiesta (request).
// res: L'oggetto della risposta (response).
// next: Una funzione callback che passa il controllo al prossimo middleware nella pila. Se non chiami next() all'interno del tuo middleware, il ciclo di richiesta/risposta si interrompe lì e la richiesta rimane appesa.

// Il codice che hai fornito è un middleware per un'applicazione Express.js. Questo middleware configura le intestazioni (headers) HTTP per gestire CORS (Cross-Origin Resource Sharing), che è un meccanismo di sicurezza implementato nei browser web per controllare le richieste fatte ad un dominio diverso da quello dal quale proviene la pagina corrente.

// Ecco una spiegazione dettagliata di ogni parte:

// 1. `app.use((req, res, next) => { ... });`: Questo è un middleware che viene eseguito per ogni richiesta all'app. `req`, `res` e `next` sono rispettivamente l'oggetto richiesta, l'oggetto risposta e una funzione per passare il controllo al prossimo middleware.

// 2. `res.header("Access-Control-Allow-Origin", "*");`: Questa linea imposta l'intestazione `Access-Control-Allow-Origin` a `"*"`, il che significa che qualsiasi origine (sito web) può accedere alle risorse del server. In un contesto reale, potresti voler limitare l'accesso solo ad alcuni domini fidati.

// 3. `res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");`: Questa linea specifica quali intestazioni HTTP possono essere utilizzate durante la richiesta effettiva. Queste sono intestazioni comuni inviate con le richieste AJAX.

// 4. 
// ```javascript
// if(req.method == 'OPTION'){
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
// }
// ```
// Se la richiesta HTTP è di tipo `OPTIONS`, questo codice imposta un'intestazione che indica quali metodi HTTP (GET, POST, PUT, DELETE) sono permessi quando si accede alla risorsa. La richiesta `OPTIONS` è una richiesta "preflight" inviata dai browser per verificare le autorizzazioni CORS prima di inviare una richiesta effettiva.

// 5. `next();`: Questa funzione passa il controllo al prossimo middleware o al gestore di route. È importante chiamare `next()` per garantire che la pipeline delle richieste continui a funzionare correttamente.

// In sintesi, questo middleware configura le risposte del server per gestire le richieste da origini diverse (CORS) in un ambiente Express.js.
// app.use((req,res,next)=>{
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     if(req.method == 'OPTION'){
//         res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//     }
//     next();
// });
app.get('/', (req, res,next) => {
    res.status('200').json({message:'Service is up'});
    next();
});
app.use('/users',usrRouter);
app.use((req, res,next) => {
    const error = new Error('Not Found');
    error.status=400;
    next(error);
});
//error registration with middleware
app.use((error,req,res,next) => {
    res.status(error.status || 500).json({
        error:{
            message:error.message,
            status:error.status,
        },
    });
    next(error);
});
//routers app.use("/register",registrationRouter)
connect();
module.exports = app;
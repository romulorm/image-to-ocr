//Carregando módulos
const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const session = require('express-session')
const tesseract = require("node-tesseract-ocr")

const app = express()

//Session
app.use(session({
    secret: "asiuhfsidhfsdafsdha343454354",
    resave: true,
    saveUninitialized: true
}))

//Variáveis de Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})

//Body Parser
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())

//Handlebars
    app.engine('handlebars', hbs.engine({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');
    app.set('views', path.join(__dirname, 'views'))

// Arquivos estáticos públicos (css, img, etc)
    app.use(express.static(path.join(__dirname, '/public')));

// Chamar página principal
app.get('/', (req, res) => {
    res.render('index',{dados:''})
    })

app.post('/extract', (req, res) => {
    
    const config = {
        lang: "por",
        oem: 1,
        psm: 3,
    };

    const img = req.body.imgurl;

    tesseract
        .recognize(img, config)
        .then((text) => {
            res.render('index',{dados:text})
        })
        .catch((error) => {
            console.log(error.message);
            res.redirect('/')
        });
})


//Iniciando servidor WEB

    var port = process.env.PORT || 3000
    var url = 'http://localhost'

    app.listen(port, () => console.log(`Image to OCR executando no endereço ${url}${port}`))
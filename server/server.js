const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    config = require('./config/config').get(process.env.NODE_ENV),
    path = require('path'),
    fs = require("fs"),
    app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, { useNewUrlParser: true } )

const { Reteta } = require('./modele/reteta');

app.use(bodyParser.json());
app.use(express.static('client/public'))

var multer = require('multer');
if (process.env.NODE_ENV === 'production') {
    var upload = multer({ dest: 'client/build/imagini/' })
} else {
    var upload = multer({ dest: 'client/public/imagini/' })
}


// GET //
app.get('/api/retetaDupaID/:uuid', (req, res) => {
    let _uuid = req.params.uuid
    Reteta.find({ _uuid }, (err, reteta) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(reteta[0])
    })
})

app.get('/api/toateRetetele', (req, res) => {
    Reteta.find( {} , (err, reteta) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(reteta)
    })
})

app.get('/api/cautaRetetaDupaCuvant', (req, res) => {
    let cuvant = req.query.cuvant;


    Reteta.find({$or:[{ titlu_reteta:cuvant } , {descriere_reteta:cuvant} , {ingrediente_reteta:cuvant} ]}, (err, reteta) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(reteta)
    })
})

// POST //
app.post('/api/retetaNoua', (req, res) => {

    let _uuid = Math.random().toString(16).substr(2, 9) + Math.random().toString(16).substr(2, 9);
    let titlu_reteta = req.body.titlu;
    let descriere_reteta = req.body.descriere;
    let ingrediente_reteta = req.body.ingrediente;
    let fileUpload = req.body.fileUpload;
    let imagine;

    if (fileUpload) {
        console.log(fileUpload);
        imagine = fileUpload;
    } else {
        imagine = "default.png";
    }

    console.log(req.body)
    if (titlu_reteta !== undefined && descriere_reteta !== undefined && ingrediente_reteta !== undefined) {
        if (titlu_reteta.length > 255 && descriere_reteta.length > 2000) {
            return res.json({
                success: false,
                eroareTitlu: 'Titlul trebuie sa contina maxim 5 caractere',
                eroareDescriere: 'Descrierea trebuie sa contina maxim 5 caractere'
            })
        } else if (titlu_reteta.length > 255) {
            return res.json({
                success: false,
                eroareTitlu: 'Titlul trebuie sa contina maxim 5 caractere',
                eroareDescriere: ''
            })
        } else if (descriere_reteta.length > 2000) {
            return res.json({
                success: false,
                eroareTitlu: '',
                eroareDescriere: 'Descrierea trebuie sa contina maxim 5 caractere'
            })
        } else {
            const reteta = new Reteta({
                _uuid,
                titlu_reteta,
                descriere_reteta,
                ingrediente_reteta,
                imagine
            });
            console.log(reteta)
            reteta.save((err, doc) => {
                if (err) {
                    return res.json({
                        success: false,
                        eroareTitlu: '',
                        eroareDescriere: 'Eroare de server, mai incearca o data!'
                    })
                }
                res.status(200).json({
                    success: true,
                    eroareTitlu: '',
                    eroareDescriere: '',
                    reteta: doc
                })
            })
        }
    } else {
        return res.json({
            success: false,
            eroareTitlu: '',
            eroareDescriere: 'Adauga cel putin un element!'
        })
    }

})

app.post('/api/upload/', upload.single('myFile'), (req, res) => {
    if (req.file) {
        // console.log("=============================");
        // console.log(req.file);
        // console.log(req.file.originalname);
        // console.log(req.file.path);
        // console.log(req.file.destination+req.file.originalname);
        // console.log("=============================");

        fs.rename(req.file.path, req.file.destination + req.file.originalname, err => {
            if (err) console.log(err)
        })

    } else {
        console.log("no file ", req.body)
    }
    res.status(200).send("Imaginea e adaugata")
})


// UPDATE //

app.post('/api/editeazaReteta', (req, res) => {

    let _uuid = req.body._uuid;
    let titlu_reteta = req.body.titlu;
    let descriere_reteta = req.body.descriere;
    let ingrediente_reteta = req.body.ingrediente;
    let fileUpload = req.body.fileUpload;
    let imagine;

    let reteta = {
        titlu_reteta,
        descriere_reteta,
        _uuid,
        ingrediente_reteta,
        imagine
    }

    if (fileUpload) {
        console.log(fileUpload);
        imagine = fileUpload;
    } else {
        imagine = "default.png";
    }

    console.log(req.body)
    if (titlu_reteta !== undefined && descriere_reteta !== undefined && ingrediente_reteta !== undefined) {
        if (titlu_reteta.length > 255 && descriere_reteta.length > 2000) {
            return res.json({
                success: false,
                eroareTitlu: 'Titlul trebuie sa contina maxim 5 caractere',
                eroareDescriere: 'Descrierea trebuie sa contina maxim 5 caractere'
            })
        } else if (titlu_reteta.length > 255) {
            return res.json({
                success: false,
                eroareTitlu: 'Titlul trebuie sa contina maxim 5 caractere',
                eroareDescriere: ''
            })
        } else if (descriere_reteta.length > 2000) {
            return res.json({
                success: false,
                eroareTitlu: '',
                eroareDescriere: 'Descrierea trebuie sa contina maxim 5 caractere'
            })
        } else {

            Reteta.find( { _uuid }, (err, doc) => {
                if (err) return res.json({
                    success: false,
                    err,
                    eroareTitlu: '',
                    eroareDescriere: 'Eroare de server, mai incearca o data!'
                })

                doc = doc[0];
                doc._uuid = _uuid;
                doc.titlu_reteta = titlu_reteta;
                doc.descriere_reteta = descriere_reteta;
                doc.ingrediente_reteta = ingrediente_reteta;
                doc.imagine = imagine;
                
                doc.save(function (err) {
                    if(err) {
                        return res.json({
                            success: false,
                            err,
                            eroareTitlu: '',
                            eroareDescriere: 'Eroare de server, mai incearca o data!'
                        })
                    }else{
                        return res.status(200).json({
                            success: true,
                            eroareTitlu: '',
                            eroareDescriere: '',
                        })
                    }
                });                
            })
        }
    } else {
        return res.json({
            success: false,
            eroareTitlu: '',
            eroareDescriere: 'Adauga cel putin un element!'
        })
    }
    //res.status(200).send(req.body)
})

// DELETE //

app.delete('/api/stergeReteta', (req, res) => {
    let uuid = req.query.id;
    if (uuid) {
        Reteta.deleteOne( {_uuid: uuid} , (err) => {
            if (err)
                return res.status(200).json({
                    success: false,
                })
            return res.status(200).json({
                success: true,
            })
        });
    } else {
        res.json({
            success: false
        })
    }
})

if (process.env.NODE_ENV === 'production') {

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
    });

}else{
    // app.get('*', (req, res) => {
    //     res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
    // });
}

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server on port: ${port}`)
})
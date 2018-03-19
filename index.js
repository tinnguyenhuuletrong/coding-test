const fs = require('fs')
const os = require('os')
const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const uniqid = require('uniqid');
const ProblemSet = require('./problems')

const app = express()

app.use('/web', express.static('web'))

// app.use(bodyParser.json())
app.use(fileUpload({
    limits: {
        fileSize: 2 * 1024 * 1024
    },
}));

let RUNNING_PORT = process.env.RUNNING_PORT || 3001

app.get('/', (req, res) => {
    res.json({
        name: 'UnitTest',
        hostname: os.hostname(),
        port: RUNNING_PORT
    })
})

app.get('/problems', (req, res) => {
    res.json(Object.keys(ProblemSet))
})


const EXTENSION_MAP = {
    'exe': 'exe',
    'node': 'js'
}
app.post('/doTest/:probId', function(req, res) {
    const probId = req.params.probId
    const engine = req.body.engine || 'exe'

    const problem = ProblemSet[probId]
    if (problem == null)
        return res.status(404).json({
            error: 404,
            msg: `Problem ${probId} Not Available`
        })
        
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    let input = req.files.input;
    
    if (!input)
        return res.status(400).send('File naming error. It must be `input.exe`');
    const hash = uniqid(`${probId}`)
    const tmpPath = `./_tmp/${hash}.${EXTENSION_MAP[engine]}`
    input.mv(tmpPath, (err) => {
        if (err)
            return res.status(500).json({
                error: 500,
                msg: err
            })

        problem(tmpPath, engine)
            .then(testResult => {
                res.json({
                    _id: hash,
                    testResult: testResult
                })
            })
            .catch(err => {
                res.status(406).json({
                    error: 406,
                    msg: err
                })
            })
    })

});


app.listen(RUNNING_PORT, () => console.log(`Example app listening on port ${RUNNING_PORT}!`))
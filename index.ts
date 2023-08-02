import express, { Express, Request, Response } from 'express';
import cors from 'cors'
import path from 'path';
import fs from 'fs'

const app: Express = express()
const routes = require('./src/routes/Routes')

const PORT = 3003

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}))

app.use('/', routes)

app.get('/', async (req, res, next) => {
    const packageJsonPath = path.join(__dirname, 'package.json').replace('dist/', '');
    const packageJsonData = fs.readFileSync(packageJsonPath, 'utf8');
    const { version } = JSON.parse(packageJsonData);

    res.send({ success: true, status: "Live", listeningPort: PORT, project: "testing", version })
})

app.listen(PORT, () => {
    console.log(`Server is Listing on Port: ${PORT}`)
})
//https://tan-fierce-dolphin.cyclic.cloud/
import express, { Express, Request, Response } from 'express';
import cors from 'cors'
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
    res.send({ success: true, status: "Live", listeningPort: PORT, project: "testing" })
})

app.listen(PORT, () => {
    console.log(`Server is Listing on Port: ${PORT}`)
})
//https://tan-fierce-dolphin.cyclic.cloud/
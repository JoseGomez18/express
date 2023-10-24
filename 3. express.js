const express = require('express')
const app = express()
const ditto = require('./pokemon/ditto.json')

app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234
// esta linea hace todo lo siguiente
app.use(express.json())
// esto

// let body = ''

// // escuchar el evento data
// req.on('data', chunk => {
//   body += chunk.toString()
// })

// req.on('end', () => {
//   const data = JSON.parse(body)
//   res.status(201).json(data)
// })

// app.post('/pokemon', (req, res) => {
//   let body = ''

//   // escuchar el evento data
//   req.on('data', chunk => {
//     body += chunk.toString()
//   })

//   req.on('end', () => {
//     const data = JSON.parse(body)
//     res.status(201).json(data)
//   })
// })

app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body)
})

// la ultima a la que va llegar, para todas las acciones va pasar por este
app.use((req, res) => {
  res.status(404).send('404')
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})

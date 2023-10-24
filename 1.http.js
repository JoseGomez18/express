// dependecnia http que nos permite procesos con protocolos http y poder recibir peticiones
const http = require('node:http')

const desiredPort = process.env.PORT ?? 3000

const processRequest = (req, res) => {
//   console.log('request received:' + req.url)
//   cuando reciba la peticion se respondera con esto
//   res.end('hola mundo')
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  if (req.url === '/') {
    res.statusCode = 200 // OK
    res.end('Bienvenidoa mi página de inicio')
  } else if (req.url === '/contacto') {
    res.statusCode = 200 // OK
    res.end('mi página de contacto')
  } else {
    res.statusCode = 400 // OK
    res.end('404')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})

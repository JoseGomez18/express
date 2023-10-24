const express = require('express')
const app = express()

const cursos = require('./ejemploCursos.json')

const PORT = process.env.PORT ?? 12345

// middleware
// esto es para procesar el cuerpo de una solicitud
// en formato JSON y poder trabajar con el cuerpo de la solicitud en el codigo
app.use(express.json())

// Routing (Direccionamiento o Enrutamiento)
app.get('/', (req, res) => {
  res.send('inicio')
})

// todos los cursos
app.get('/api/cursos', (req, res) => {
  res.json(cursos)
})

// cursos programación y parametro query
app.get('/api/cursos/programacion', (req, res) => {
  const cantidad = req.query.cantidad

  if (cantidad) {
    const cantidadCursos = parseInt(cantidad)

    if (typeof (cantidadCursos) === 'number' && cantidadCursos > 0) {
      const cursosLimitados = cursos.programacion.slice(0, cantidadCursos)
      res.json(cursosLimitados)
    } else {
      res.status(400).send('El parámetro "cantidad" debe ser un número entero positivo.')
    }
  } else {
    res.json(cursos.programacion)
  }
})

// cursos matematicas
app.get('/api/cursos/matematicas', (req, res) => {
  res.json(cursos.matematicas)
})

// cursos programación de cada lenguaje
app.get('/api/cursos/programacion/:lenguaje', (req, res) => {
  const lenguaje = req.params.lenguaje
  const resultados = cursos.programacion.filter(curso => curso.lenguaje === lenguaje)

  if (resultados.length === 0) {
    return res.status(404).send(`404 no se encontraron cursos del lenguaje ${lenguaje}`)
  }
  res.json(resultados)
})

// cursos matematicas de cada tema
app.get('/api/cursos/matematicas/:tema', (req, res) => {
  const tema = req.params.tema
  const resultados = cursos.matematicas.filter(curso => curso.tema === tema)

  if (resultados.length === 0) {
    return res.status(404).send(`404 no se encontraron temas del curso ${tema}`)
  }
  res.json(resultados)
})

// modificar todo un curso de programacion
app.put('/api/cursos/programacion/:id', (req, res) => {
  const cursoActualizado = req.body
  const id = parseInt(req.params.id)
  console.log(id)

  const indice = cursos.programacion.findIndex(curso => curso.id === id)

  if (indice === -1) {
    res.status(404).send('no existe un curso con ese id')
  } else {
    cursos.programacion[indice] = cursoActualizado
  }
  res.json(cursos.programacion)
})

// modificar algo de un curso de programacion
app.patch('/api/cursos/programacion/:id', (req, res) => {
  const infoActualizada = req.body
  const id = parseInt(req.params.id)

  const indice = cursos.programacion.findIndex(curso => curso.id === id)

  if (indice === -1) {
    res.status(404).send('no existe un curso con ese id')
    return
  }
  const cursoAModificar = cursos.programacion[indice]
  Object.assign(cursoAModificar, infoActualizada)
  res.json(cursos.programacion)
})

// crear un nuevo curso programacion
app.post('/api/cursos/programacion', (req, res) => {
  const cursoNuevo = req.body
  cursos.programacion.push(cursoNuevo)
  res.json(cursos.programacion)
})

// eliminar un curso programacion
app.delete('/api/cursos/programacion/:id', (req, res) => {
  const id = parseInt(req.params.id)

  const indice = cursos.programacion.findIndex(curso => curso.id === id)

  if (indice >= 0) {
    cursos.programacion.splice(indice, 1)
  }
  res.json(cursos.programacion)
})

app.listen(PORT, () => {
  console.log(`el servidor se está escuchando en el puerto http://localhost:${PORT}`)
})

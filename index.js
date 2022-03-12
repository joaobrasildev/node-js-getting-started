const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 3000
const ENDPOINT = '/api/'


const lista_produtos = { 
  produtos: [ 
    { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  }, 
    { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  }, 
    { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  }, 
    { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  }, 
    { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  }, 
  ] 
} 

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use (express.urlencoded({extended: true}))

app.get (ENDPOINT + 'produtos', (req, res, next) => {
  res.status (200).json (lista_produtos) 
})

app.get (ENDPOINT + 'produtos/:id', (req, res, next) => {
  let id = parseInt (req.params.id);
  let idx = lista_produtos.produtos.findIndex (elem => elem.id === id)

  if (idx != -1) {
      res.status (200).json (lista_produtos.produtos[idx]) 
  }
  else {
      res.status(404).json ({ message: 'Produto não encontrado.' })
  }
})

app.post (ENDPOINT + 'produto', (req, res, next) => {
  let request = req.body

  if(request.id && request.descricao && request.valor && request.marca) {
    lista_produtos.produtos.push(request)

    res.status(200).json(lista_produtos.produtos)
  } else {
    res.status(400).json ({message: 'payload deve conter os seguintes paramentros: id, descricao, valor, marca.'})
  }
})

app.put (ENDPOINT + 'produtos/:id', (req, res, next) => {
  let id = parseInt (req.params.id);
  let { descricao, valor, marca } = req.body
  let idx = lista_produtos.produtos.findIndex (elem => elem.id === id)

  if (idx != -1) {
      if(descricao){
        lista_produtos.produtos[idx].descricao = descricao
      }
      if(valor){
        lista_produtos.produtos[idx].valor = valor
      }
      if(marca){
        lista_produtos.produtos[idx].marca = marca
      }
      res.status(200).json (lista_produtos.produtos[idx])
  }
  else {
      res.status(404).json ({ message: 'Produto não encontrado.' })
  }

})

app.delete (ENDPOINT + 'produtos/:id', (req, res, next) => {
  let id = parseInt (req.params.id);
  let idx = lista_produtos.produtos.findIndex (elem => elem.id === id)
  if (idx != -1) {
      lista_produtos.produtos.splice(idx, 1)
      res.status(200).json ({ message: 'Produto excluído com sucesso!' })
  }
  else {
      res.status(404).json ({ message: 'Produto não encontrado.' })
  }
})


app.listen (PORT, () => {
  console.log (`Servidor rodando em http://localhost:${PORT}`)
})

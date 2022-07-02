# back-grupo-sx

#### Instale as dependências
`
npm install
`
#### Crie um arquivo .env e configure com as credenciais conforme arquivo .env.example
`
touch .env
`
#### Execute a aplicação em modo de desenvolvimento na porta 8000
`
npm run dev
`

## Os endpoint da empresa: 

### Criar
`
 {{ _.baseUrl }}/company/create
`
###### JSON 
`
{
	"cnpj": 1234567891,
	"name": "testeee",
	"email": "teste@gmail.com",
	"phone": 9912371,
	"address": "teste"
}
`

### Atualizar 
`
{{ _.baseUrl }}/company/{{ code }}
`
###### JSON 
`
{
	"cnpj": 1234567891,
	"name": "testeee",
	"email": "teste@gmail.com",
	"phone": 99105442,
	"address": "teste"
}
`
### Pesquisar por ID 
`
{{ _.baseUrl }}/company?code={{ code }}
`
### Pesquisar todas
`
{{ _.baseUrl }}/company
`
### Deletar
`
{{ _.baseUrl }}/company/{{ code }}
`
## Os endpoint do colaborador: 

### Criar
`
{{ _.baseUrl }}/collaborator/create
`
###### JSON 
`
{
	"cpf": 12314561241191,
	"name": "teste",
	"email": "teste@gmail.com",
	"phone": 99113231,
	"address": "teste",
	"company_code": 2
}

### Atualizar 
`
{{ _.baseUrl }}/collaborator/{{ code }}
`
###### JSON 
`
{
	"cpf": 123456789,
	"name": "testeee atualizacao",
	"email": "teste@gmail.com",
	"phone": 99123211,
	"address": "teste",
	"company_code": 3
}
`
### Pesquisar por ID
`
{{ _.baseUrl }}/collaborator?code={{ code }}
`
### Pesquisar por todas
`
{{ _.baseUrl }}/collaborator
`
### Deletar 
`
{{ _.baseUrl }}/collaborator/{{ code }}
`


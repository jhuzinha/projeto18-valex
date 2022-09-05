# VALEX

Projeto em TypeScript e postgreSQL. API de cartões de benefícios. A API será responsável pela criação, recarga, ativação, assim como o processamento das compras.


**Rota de Criação do cartão (/card/create/employee/:id)** <br> 
Nesta rota a empresa cadastrada poderá criar um cartão para o funcionário. Para isso, é necessário passar a chave da companhia no header no formato: ‘x-api-key' e o id do funcionário por parâmetro de rota. A API espera receber pelo body o seguinte objeto: 
```
{
“type": 
}
```
Utilizado para informar qual o tipo do cartão. Os tipos são pré definidos e podem ser 'groceries', 'restaurants', 'transport', 'education', 'health'.

**Rota de Ativação do cartão (/card/ativate/:id)** <br>
Nesta rota o funcionário poderá ativar seu cartão. A API espera receber por parâmetro de rota o id do cartão que o funcionário deseja ativar. Também é necessário passar um body no formato:
```
{
“password”:
“cvv”:
}
```
Password é a senha que o funcionário quer cadastrar no cartão. Sendo ela de 4 dígitos numéricos.
CVV é o Código de Verificação do Cartão, ele contém três dígitos.

**Rota de Visualização de saldo e transações (/card/information/:id)** <br>
Nessa rota a API espera receber por parâmetro de rota o id do cartão.
Somente cartões cadastrados podem ser visualizados. É esperado o retorno de um body no formato: 
```
{
  "balance": 35000,
  "transactions": [
{ "id": 1, "cardId": 1, "businessId": 1, "businessName": "DrivenEats", "timestamp": "22/01/2022", "amount": 5000 }
]
  "recharges": [
{ "id": 1, "cardId": 1, "timestamp": "21/01/2022", "amount": 40000 }
]
}
```
**Rota de Bloqueio de Cartão (/card/block/:id)** <br>
Nesta rota a API espera receber por parâmetro de rota o id do cartão. Também é necessário passar um body no formato:
```
{
“password”:
}
```

Essa password é a senha do cartão que foi informada no parâmetro de rota

**Rota de Desbloqueio de Cartão (/card/unlock/:id)** <br>
Nessa rota a API espera receber por parâmetro de rota o id do cartão. Também é necessário passar um body no formato:
```
{
“password”:
}
```

Essa password é a senha do cartão que foi informada no parâmetro de rota

**Rota de Recarga do Cartão (/card/recharge/:id)** <br>
A empresa poderá recarregar o cartão do funcionário. Para um cartão ser recarregado precisamos do identificador do mesmo passado por parâmetro de rota e um body no formato:
```
{
“amount”: 
}
```

Informando o valor da recarga em CENTAVOS. O valor precisa ser um número positivo maior que 0.


**Rota de Compras do Cartão (/payment/:id/POS)** <br>
Nessa rota, empregados podem comprar em Points of Sale (maquininhas). Para realizar a compra precisamos do identificador do cartão passado por parâmetro de rota. E também é necessário um body no formato:
```
{
“amount”: ,
“businessId”:, 
“password”: ,
}
```
O body informará para a API o id do local onde a compra foi realizada, a senha do cartão e o valor da compra.

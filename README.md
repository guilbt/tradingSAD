# Cadastro Pessoas Básico
Aplicação Front-end + Back-end para um simples cadastro de pessoas


# Instalação
Para utilizar a aplicação localmente, você precisa:
- Ter o Docker instalado no computador;
- Estar com as portas 3000, 8081 e 15432 disponíveis no seu computador;
- Então ir até à pasta root do projeto, onde se encontra o docker-compose.yml, e rodar o comando `docker-compose up` no prompt de comando. 


# Uso

- A aplicação tem um front-end básico, que ficará disponível na porta 3000 E um back-end disponível na porta 8081, com documentação básica feita pelo swagger, que ficará disponível na url
http://localhost:8081/api/swagger-ui.html;

- A aplicação permite que sejam feitos cadastros, busca e deleção de pessoas por rotas;
- No momento, o front-end só tem a feature de criação de pessoas;

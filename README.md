# Sistema Mock-Up de um SAD para Investimentos
Esta aplicação foi construida utilizando https://github.com/guilbt/cadastropessoas como boilerplate.


# Instalação
Para utilizar a aplicação localmente, você precisa:
- Ter o Docker instalado no computador;
- Estar com as portas 3001, 8081 e 15432 disponíveis no seu computador;
- Então ir até à pasta root do projeto, onde se encontra o docker-compose.yml, e rodar o comando `docker-compose up` no prompt de comando; 
- A aplicação front-end será acessível pela url localhost:3001 do seu navegador.


# Uso

- A aplicação vai ter um back-end disponível na porta 8081, com documentação básica feita pelo swagger, que ficará disponível na url
http://localhost:8081/api/swagger-ui.html;
- É possível testar quase todas as rotas da aplicação navegando pelo front-end, localizado na porta 3001;
- É possível também visualizar os endpoints disponíveis nessa coleção do postman: https://www.getpostman.com/collections/233cea4fba2219ad85ea ;
- Para utilizar as outras rotas da aplicação, é necessário primeiro acessar a rota de Login, usando o usuário base (username: usuario@default.com, password: pass), para conseguir um token de sessão
- A aplicação permite que um usuário:
	- Informe um valor que deseja aplicar;
	- Busque um subconjunto dos ativos indicados de acordo com um valor;
	- Invista um montante em um ativo;
	- Busque o total investido e o subconjunto de cada ativo (sua carteira).


# Aviso

A aplicação hoje depende de um token registrado no site https://www.alphavantage.co o que limita bastante o seu uso, visto que a api permite apenas 5 requisições por token gratuito por minuto. Caso deseje utilizar mais que isso, é possível alterar o token na classe `AlphaVantageClient` dentro do back-end.

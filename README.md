# shortly-api

- PT- API para criação e compartilhamento de links, utilizando tecnologias para encurtar URLs. Todas as rotas autenticadas devem receber um header Authorization no formato Bearer TOKEN. Banco de dados populado e criado nos arquivos;


- ENG- API for creating and sharing links, using technologies to shorten URLs. All authenticated routes must receive an Authorization header in Bearer TOKEN format. Database populated and created in the files;


- **POST** `/signup`
    - Esta **não é** uma rota autenticada.
    - Deve receber um corpo (*body*) no formato:
        
        ```jsx
        {
        	name: "João",
          email: "joao@driven.com.br",
          password: "driven",
          confirmPassword: "driven"
        }
        ```
        
    - Deve responder com *status code* `201`.
    - Caso exista algum erro no formato do corpo enviado, responder com *status code* `422` e os erros correspondentes.
    - Caso exista algum usuário cadastrado com o e-mail enviado no corpo da requisição, responder com *status code* `409`.
- **POST** `/signin`
    - Esta **não é** uma rota autenticada.
    - Deve receber um corpo (*body*) no formato:
        
        ```jsx
        {
          email: "joao@driven.com.br",
          password: "driven"
        }
        ```
        
    - Deve retornar o *status code* `200` com o *token* gerado para autenticação.
    - Caso o usuário/senha não seja compatível (ou não exista), retornar o *status code* `401`.
    - Caso exista algum erro no formato do corpo enviado, responder com *status code* `422` e os erros correspondentes.
- **POST** `/urls/shorten`
    - Esta é uma **rota autenticada.**
    - Deve receber um *header* `Authorization` no formato `Bearer TOKEN`.
    - Deve receber um corpo (*body*) no formato:
        
        ```json
        {
        	"url": "https://..."
        }
        ```
        
    - Deve responder com *status code* `201` e corpo (*body*) no formato:
        
        ```json
        {
        	"shortUrl": "a8745bcf" // aqui o identificador que for gerado
        }
        ```
        
    - Caso o *header* não seja enviado ou seja inválido, responder com *status code* `401`.
    - Caso exista algum erro no formato do corpo enviado, responder com *status code* `422` e os erros correspondentes.
    - Dica: Use a biblioteca **[nanoid](https://www.npmjs.com/package/nanoid)** para gerar as `shortUrl`.
- **GET** `/urls/:id`
    - Esta **não é** uma rota autenticada.
    - Deve responder com *status code* `200` e corpo (*body*) no formato:
        
        ```json
        {
        	"id": 1,
        	"shortUrl": "bd8235a0",
        	"url": "https://..."
        }
        ```
        
    - Caso a url encurtada não exista, responder com *status code* `404`.
- **GET** `/urls/open/:shortUrl`
    - Esta **não é** uma rota autenticada.
    - Redirecionar o usuário para o link correspondente.
    - Aumentar um na contagem de visitas do link.
    - Caso a url encurtada não exista, responder com *status code* `404`.
    - Dica: Procure por **res.redirect**.
- **DELETE** `/urls/:id`
    - Esta é uma **rota autenticada.**
    - Deve receber um *header* `Authorization` no formato `Bearer TOKEN`.
    - Caso o *header* não seja enviado ou seja inválido, responder com *status code* `401`.
    - Deve responder com *status code* `401` quando a url encurtada não pertencer ao usuário.
    - Se a url for do usuário, deve responder com *status code* `204` e excluir a url encurtada.
    - Caso a url encurtada não exista, responder com *status code* `404`.
- **GET** `/users/me`
    - Esta é uma **rota autenticada.**
    - Deve receber um *header* `Authorization` no formato `Bearer TOKEN`.
    - A rota deve retornar os dados do usuário atrelado ao token.
    - Deve responder com *status code* `200` e corpo (*body*) no formato:
        
        ```json
        {
          "id": id do usuário,
        	"name": nome do usuário,
        	"visitCount": soma da quantidade de visitas de todos os links do usuário,
        	"shortenedUrls": [
        		{
        			"id": 1,
        			"shortUrl": "...",
        			"url": "...",
        			"visitCount": soma da quantidade de visitas do link
        		},
        		{
        			"id": 2,
        			"shortUrl": "...",
        			"url": "...",
        			"visitCount": soma da quantidade de visitas do link
        		}
        	]
        }
        ```
        
    - Caso o *header* não seja enviado ou seja inválido, responder com *status code* `401`.
    - Caso o usuário não exista, responder com *status code* `404`.
- **GET** `/ranking`






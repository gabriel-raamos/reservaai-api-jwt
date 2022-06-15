# reservaai-api-jwt
REST API com autenticação e autorização.

Para a sua execução, é necessário apenas rodar os seguintes códigos no client MySQL:
- create database reservaai;
- create user 'pi'@'localhost' identified by 'password';
- grant all privileges on * . * to 'pi'@'localhost';

Isso é necessário pois, para criar as tabelas no banco de dados, o Sequelize precisa reconhecer um banco e um usuário que estejam cadastrados no arquivo config/database.config.js.

# 15/06/2022
Para implementar o JWT, deve-se criar uma API Key na sessão "Auth" do Postman chamada "cli" e criar uma variável ambiente chamada cliToken. Após isso, atribua o valor {{cliToken}} à API Key e, na área de login, clique em testes e adicione o seguinte código.

pm.environment.set("cliToken", pm.response.json().token);

Esse código enviará o token gerado no login ao header "cli" através da variável ambiente "cliToken".

O processo é o mesmo com o proprietário, necessitando apenas a substituição de "cli" por "pro" e "cliToken" por "proToken".

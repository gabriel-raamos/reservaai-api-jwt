# reservaai-api-jwt
REST API com autenticação e autorização.

# 15/06/2022
Para implementar o JWT, deve-se criar uma API Key na sessão "Auth" do Postman chamada "cli" e criar uma variável ambiente chamada cliToken. Após isso, atribua o valor {{cliToken}} à API Key e, na área de login, clique em testes e adicione o seguinte código.

pm.environment.set("cliToken", pm.response.json().token);

Esse código enviará o token gerado no login ao header "cli" através da variável ambiente "cliToken".

O processo é o mesmo com o proprietário, necessitando apenas a substituição de "cli" por "pro".

# e-Comm Project

Neste documento serão registrados dados referentes a aplicação e-Comm, desenvolvida por Carolina Campelo Guisso, durante os 12 meses do curso Level Up – ministrado pela Alura em parceria com a empresa PagoNxt.
No documento discorrer-se-á sobre os fatores que compõem a metodologia “The Twelve Factors App”, bem como padrões de Microsserviços aplicados ao projeto desenvolvido. Serão expostas reflexões sobre implementações alinhadas com os padrões mencionados.

## The Twelve Factors App

### I. Base de Código

O primeiro fator diz respeito a importância de manter apenas uma única base de código por app que não deve ser compartilhada entre aplicações e existir diversos deploys. Além disto, deve ser rastreável através de um controle de versão.
A aplicação e-Comm segue parcialmente este padrão, uma vez que é versionada, possui rastreabilidade e diversos deploys. A maior parte do código não é compartilhada, excetuando por trechos relacionados a autenticação e autorização. Além disto, os deploys não são padronizados e automatizados.

Sugestão(ões):

- Criar uma biblioteca para autenticações e autorizações e/ou um API Gateway;
- Realizar deploy automatizado e somente então, disponibilizar o projeto em produção.

### II.Dependências

As bibliotecas devem ser explicitadas no projeto e deve existir uma maneira prática de acessar estas dependências. O projeto contempla este fator plenamente, visto que possui todas dependências listadas em seus arquivos “package.json” e possibilita a instalação via “npm”.

### III. Configurações

As configurações do projeto devem sempre ser separadas do código propriamente dito e preferencialmente armazenadas em variáveis de ambiente. Além disso, devem facilitar a transição entre ambientes – como o de desenvolvimento, teste, produção.
No projeto e-Comm parte das configurações está separada em arquivos “.env”, mas em microsserviços específicos estão armazenadas em um arquivo de constantes e isto poderia ser alterado. Além disto, devem facilitar a transição entre ambientes – como o de desenvolvimento, teste, produção.

Sugestão(ões):

- Alterar o arquivo de constantes dos microsserviços finance e orders para que não armazenem configurações.

### IV. Serviços de Apoio

Os serviços de apoio devem ser tratados como recursos anexados e contar com facilidade para serem substituídos ou acessados. Na aplicação e-Comm todos os serviços anexados (como Banco de Dados) são tratados desta maneira e bastam algumas pequenas modificações em configurações para que sejam alterados.  

### V. Construa, lance, execute

Esta propriedade diz respeito a ter estágios distintos para a construção de um executável através do repositório de código, para o lançamento de uma release contendo a construção e as configurações e para a execução da aplicação através de processos definidos. A aplicação e-Comm se encontra no estágio de construção e mesmo dentro deste estágio segue a rotina de construção, lançamento e execução em desenvolvimento.

Sugestão(ões):

- Utilizar ferramentas de deploy para armazenar os lançamentos a fim de documentar de forma eficaz as informações.

### VI. Processos

Este fator promove a execução da aplicação como processos que não armazenam estado e pontua que qualquer informação que deva persistir deve ser armazenada em serviços de apoio dedicados a tal. O e-Comm armazena informações persistentes em seus bancos de dados (MongoDB e MySQL) e seus processos são stateless. Ainda há necessidade de ajustar o armazenamento de tokens de usuários deslogados em um serviço específico.

Sugestão(ões):

- Implementar o Redis para armazenamento de tokens bloqueados.

### VII. Vínculo de porta

Uma aplicação que segue os 12 fatores é autocontida e devem estar comunicáveis via porta de rede. O e-Comm segue este paradigma e todos os containers que utiliza no Docker, por exemplo, possuem comunicação por porta de rede.

### VIII. Concorrência

A aplicação deve ser escalonável através de modelo de processos, ou seja, deve poder ser dividida em quantos processos forem necessários para permitir a escalabilidade e concorrência. Isto facilita também o gerenciamento de recursos para partes específicas da aplicação – destinar mais recursos para processos mais utilizados, por exemplo.
Esta premissa pode ser aplicada no e-Comm através de ajustes simples nos containers do Docker, por exemplo. Além disto, por usar processos com eventos “async/await” também permite processos em concorrência.

### IX. Descartabilidade

Os processos devem ser descartáveis, ou seja, que podem ser iniciados, substituídos por outros semelhantes ou parados a qualquer momento. Em parte, o sistema atende o requisito uma vez que os processos podem ser trocados e possuem mínimo tratamento de erro para casos de mau funcionamento. No entanto, este ponto requer melhorias a fim de ser atendido plenamente.

Sugestão(ões):

- Readequar os containers para tornar o tratamento de problemas mais robusto e permitir o encerramento gracioso e ágil dos mesmos (estudar a possibilidade de diminuição no timeout dos containers, por exemplo).

### X. Dev/Prod semelhantes

Os diversos ambientes devem ser o mais parecidos possível para minimizar problemas. No caso da aplicação e-Comm, poucas são as configurações que diferem entre ambientes de desenvolvimento, teste e produção. Portanto, o requisito é atendido.

### XI. Logs

As aplicações que seguem os 12 fatores não devem preocuparem-se em gerir e armazenar os logs e sim, tratá-los como eventos. Na aplicação e-Comm é utilizado o Morgan para agrupar e direcionar os logs para STDOUT.

### XII. Processos Administrativos

É interessante manter informações documentadas e automatizadas a respeito de processos administrativos (pontuais). Na aplicação e-Comm isto é observado com a migração dos modelos do banco de dados MySQL, bem como na automatização no processo de popular o MongoDB em ambiente de desenvolvimento.

## Microservices Pattern

### • Serviços de domínio

A aplicação deve ser separada por domínios específicos, com responsabilidade única e seguir o padrão de “DDD” Domain-Driven Design, bem como gerar valor. O projeto e-Comm segue este padrão uma vez que possui domínios específicos para cada API – finance, order, account e product.

### • Serviços de negócio

A ideia por trás deste conceito trata de aplicar as funcionalidades do negócio para o qual estamos projetando o app. O negócio pode consumir dados de diversos domínios para então entregar uma funcionalidade. No caso do e-Commerce, para efetuar uma compra precisamos consumir dados de todas as APIs a fim de entregar o produto. Todos os dados são processados a partir da lógica gerada pela regra de negócio.

### • API Gateway

As API Gateways normalmente são responsáveis por padronizar e gerenciar o encaminhamento de rotas para diferentes microsserviços, podem ser responsáveis por autenticação e autorizações, bem como outros problemas enfrentados no consumo de recursos. No e-Comm a API Gateway não está presente, mas conforme discorrido nos 12 Factors App, é um ponto para melhoria na aplicação.

### • Agregador de processos

É importante que os dados retornados por cada serviço sejam agregados antes de serem entregues ao consumidor. Atualmente a aplicação e-Comm não está automatizando integralmente a agregação de informações, pois alguns dados precisam ser encaminhados manualmente. Isto pode ser resolvido com a implementação do API Gateway.

### • Edge Services

Este padrão de desenvolvimento promove a importância de diferenciação entre respostas obtidas por diferentes cenários – seja por um usuário distinto, por um acesso por dispositivo móvel ou computador, etc. O e-Comm não possui padrões diferentes para a entrega de informações de acordo com o cenário, mas isto poderia ser uma implementação futura. Por exemplo, um usuário consumidor não precisaria receber informações de estoque ou ID de produto. Ainda, poderiam existir melhorias na quantidade de informações dispostas considerando as telas que poderiam ser desenvolvidas pelo front-end ao acessar a aplicação via computador ou dispositivo móvel.

### • Single database vs. Múltiplos bancos de dados

Segundo o padrão de database único, cada microsserviço deveria contar com um banco de dados diferente a fim de tornar a aplicação mais robusta. No caso do e-Comm cada banco de dados é compartilhado entre duas APIs. Uma implementação interessante poderia contar com a divisão dos bancos de dados para cada uma das APIs.

### • Eventos assíncronos

Os eventos assíncronos são úteis para quando processos não podem ser finalizados instantaneamente – um ponto que inclusive pode melhorar a experiência do usuário. No projeto e-Commerce ainda não foram implementados eventos assíncronos, mas o processamento de pagamento poderia passar por medidas antifraude e confirmações que requerem tempo para serem finalizadas.

### • Agregação de Logs

O conceito de agregar os logs facilita a rastreabilidade de informações e de processos – o que pode ser complicado em um cenário com múltiplos microsserviços. O e-Comm agrega e direciona os logs para STDOUT através do Morgan.

### • Agregação de métricas

A gestão dos dados gerados por cada serviço pode facilitar a identificação de informações pertinentes ao projeto, como para o gerenciamento de recursos, informações de saúde do sistema, entre outros. O e-Comm ainda não possui métricas definidas, mas poderiam ser gerados dados do uso do sistema pelos consumidores quando fosse adicionado à produção. Isto poderia informar quais serviços necessitam de reparos ou destinação maior de recursos.

## Outras reflexões sobre Microserviços (Semana 11)

### Padronização ou não das stacks do serviço e, se sim, qual(is) seria(m) as stacks ideais

Atualmente os serviços são padronizados e tem como cerne o Node.js e a conteinerização através do Docker. Algumas APIs Diferem no uso de bancos de dados e ORMs – MongoDB e MySQL para Mongoose e Sequelize, respectivamente.
Poderia haver padronização do uso de banco de dados, caso possível. No entanto, é importante lembrar de sempre tratá-los de maneira individual, sem que haja compartilhamento de BD entre as APIs para que siga boas práticas.

### Solução para Service Discovery

É possível implementar algum mecanismo de Service Discovery na aplicação, mas atualmente o Docker já realiza as conexões entre serviços, bem como o próprio API Gateway que tem função similar ao realizar o redirecionamento das requisições para os serviços solicitados.
No entanto, a possibilidade de implementar réplicas de contêineres – para evitar falhas, utilizar como backup, ou para aumentar os recursos em áreas específicas, por exemplo – poderia fazer emergir a necessidade do Service Discovery. Este serviço pode ser configurado no Docker através do docker-compose.

### Aspectos de segurança (rede, aplicação e segurança em repouso)

A aplicação não tem muitas configurações de segurança, apenas autorizações e autenticação para endpoints específicos. Poderiam ser implementadas algumas melhorias, como criptografia de banco de dados, anonimização de informações e adição de certificado para utilização de https.

### Tecnologias a adotar para deploy e build

Alguns processos já são utilizados no build da e-Comm, como verificação de estilo de código com o ESLint, testes unitários e de integração. Estes processos poderiam integrar uma pipeline no GitHub Actions a fim de que as PRs sejam aceitas somente quando passem em todos os pontos de verificação.

### Como lidar com tolerância a falhas em aplicações síncronas (circuit breaker, cache)

É possível implementar um circuit breaker para englobar funções que podem gerar erros possíveis de interromper o funcionamento da aplicação. Uma possibilidade é o uso da lib Opossum, um circuit breaker para Node.js.

### Em que pontos faz sentido usar comunicação assíncrona

Seria interessante implementar comunicação assíncrona na API Finance para a confirmação de pagamento, visto que é necessário tempo para este processamento. Além disso, caso os pedidos integrassem uma seção de “entrega”, poderia contar com comunicação assíncrona também.

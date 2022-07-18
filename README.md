# Produto Final


![Blogging](https://user-images.githubusercontent.com/29583708/179581796-5042ebef-859b-46da-ac34-0bcc5438164b.gif)




# Instruções

Esta prova consiste em desenvolver uma aplicação chamada Blogging utilizando Angular; são dois os entregáveis que definem a completude da prova:

1. Página inicial da aplicação, que deve ser a reprodução deste [protótipo de alta fidelidade](https://www.figma.com/file/Zc4eaNKpuE2fLhL1cGzgLq/Prot%C3%B3tipo-para-o-teste-do-frontend?node-id=0%3A1)
2. Criação livre de um modal que exiba informações sobre um usuário

##### 1. Reprodução do protótipo

Para criação da primeira parte, utilize os dados disponíveis no arquivo **rawPost.ts**, que exporta uma lista de comentários; você deve criar um serviço que simule uma requisição a uma API e, ao receber a lista, organize a propriedade _comments_ como uma **árvore**, e não como uma lista. O resultado deve ser utilizado para implementar a seção de comentários aninhados apresentada no protótipo visual.

A seção com linhas tracejadas abaixo de cada comentário é uma área livre para o candidato criar botões de ação relativas àquele comentário, como _compartilhar_, _responder_ ou _reportar_. Sua posição é apenas uma sugestão, e você é livre para posicioná-los onde e como lhe parecer apropriado.

O botão de _responder ao comentário_ deve ser funcional e disponibilizar área para resposta ao ser clicado. Salvar o comentário deve alterar o estado da página, e o novo comentário deve estar visível e corretamente aninhado na página. Você é livre para criar os estilos e usabilidade desta parte.

##### 2. Criação livre do modal

Utilizando as informações exportadas pelo arquivo **users.ts**, crie um modal que se abre ao clicar sobre o nome de um usuário e exiba informações sobre ele. Considere que o usuário logado atualmente seja _João Figueiredo_, com ID:1. Ao clicar sobre o nome de um usuário que comentou no post, o modal deve apresentar, no mínimo, as seguintes informações:

- Nome e foto do usuário
- Data de filiação ao Blogging
- Os amigos em comum com o usuário logado atualmente
- Informações básicas sobre todos os posts realizados por este usuário: título, subtítulo e parte do conteúdo do post
- Botões para adicionar ou remover o usuário da lista de amigos; botão de enviar mensagem ao usuário; botão para reportar o usuário

Cabe a você elaborar e implementar todos os estilos e organização dessas informações dentro do modal.

Você pode utilizar quaisquer fotos que desejar para cada usuário; para sua comodidade, uma pasta com algumas imagens de avatares são disponibilizadas na pasta _assets/_.

## Requisitos mínimos de entrega

Esta seção define os requisitos mínimos para que sua prova seja considerada. Ao final deste arquivo, uma checklist é disponibilizada para te ajudar a manter rastro das tarefas que devem ser completadas

- Criar repositório público no GitHub; sua branch principal pode ter qualquer nome, excetuando-se _main_. Cada parte do seu trabalho deve ser organizado em uma branch com nome descritivo e que contenha porção logicamente separada de cada tarefa. Ou seja, deve ser possível revisar e acompanhar os passos que você deu para finalizar o trabalho através dos nomes das branches utilizadas e commits realizados
- Todas as funções criadas por você devem ser cobertas por testes; todos os testes devem passar ao final do trabalho
- Utilizar tipagem para todas as entidades presentes no seu trabalho; os dados aqui fornecidos não possuem tipos e cabe a você fazer esta associação
- Criar um workspace Angular multiprojetos; no mínimo 2 projetos devem estar presentes no workspace: a aplicação em si e uma biblioteca criada por você.
- A biblioteca criada deve conter ao menos 2 componentes e você deve garantir que eles sejam utilizados no projeto
- A lista de comentários deve ser organizada como uma **lista de árvores de comentários** assim que os dados são recebidos
- O botão de _responder comentário_ deve ser funcional e fazer sentido com os estilos propostos
- Você deve replicar o protótipo visual e garantir que os comentários estejam organizados de forma aninhada
- Clicar no nome de um usuário que comentou no post deve abrir um modal que apresente as informações descritas em **2. Criação livre do modal**. Esta seção é livre e cabe a você elaborar todos os estilos e posicionamentos como lhe aprouver

# Entrega

Confira esta lista de tarefas para te ajudar a julgar se a prova está pronta para a entrega:

- [x] Replicação do estilo definido no protótipo visual
- [x] Botões de ação de responder, compartilhar e reportar comentário
- [x] O botão de responder comentário abre ação de resposta e o comentário salvo é corretamente adicionado
- [x] Clicar no nome de um usuário abre modal com suas informações
- [x] Workspace Angular multiprojetos com, no mínimo, aplicação e biblioteca
- [x] A biblioteca possui ao menos 2 componentes, todos utilizados na aplicação
- [x] Os conjuntos de teste passam

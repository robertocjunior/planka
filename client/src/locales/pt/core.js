import dateFns from 'date-fns/locale/pt-BR';

export default {
  dateFns,

  format: {
    date: 'dd/MM/yyyy',
    time: 'p',
    dateTime: '$t(format:date) $t(format:time)',
    longDate: 'd MMM',
    longDateTime: "d 'de' MMMM 'às' p",
    fullDate: 'd MMM, y',
    fullDateTime: "d 'de' MMMM, y 'às' p",
  },

  translation: {
    common: {
      aboutPlanka: 'Sobre',
      account: 'Conta',
      actions: 'Ações',
      addAttachment_title: 'Adicionar Anexo',
      addComment: 'Adicionar comentário',
      addManager_title: 'Adicionar Gerente',
      addMember_title: 'Adicionar Membro',
      addUser_title: 'Adicionar Usuário',
      administrator: 'Administrador',
      all: 'Todos',
      allChangesWillBeAutomaticallySavedAfterConnectionRestored:
        'Todas as alterações serão salvas automaticamente<br />após a conexão ser restaurada.',
      areYouSureYouWantToDeleteThisAttachment: 'Tem certeza de que deseja excluir este anexo?',
      areYouSureYouWantToDeleteThisBoard: 'Tem certeza de que deseja excluir este quadro?',
      areYouSureYouWantToDeleteThisCard: 'Tem certeza de que deseja excluir este cartão?',
      areYouSureYouWantToDeleteThisComment: 'Tem certeza de que deseja excluir este comentário?',
      areYouSureYouWantToDeleteThisLabel: 'Tem certeza de que deseja excluir este rótulo?',
      areYouSureYouWantToDeleteThisList: 'Tem certeza de que deseja excluir esta lista?',
      areYouSureYouWantToDeleteThisProject: 'Tem certeza de que deseja excluir este projeto?',
      areYouSureYouWantToDeleteThisTask: 'Tem certeza de que deseja excluir esta tarefa?',
      areYouSureYouWantToDeleteThisUser: 'Tem certeza de que deseja excluir este usuário?',
      areYouSureYouWantToLeaveBoard: 'Tem certeza de que deseja sair do quadro?',
      areYouSureYouWantToLeaveProject: 'Tem certeza de que deseja sair do projeto?',
      areYouSureYouWantToRemoveThisManagerFromProject:
        'Tem certeza de que deseja remover este gerente do projeto?',
      areYouSureYouWantToRemoveThisMemberFromBoard:
        'Tem certeza de que deseja remover este membro do quadro?',
      attachment: 'Anexo',
      attachments: 'Anexos',
      authentication: 'Autenticação',
      background: 'Fundo',
      board: 'Quadro',
      boardNotFound_title: 'Quadro não encontrado',
      canComment: 'Pode comentar',
      canEditContentOfBoard: 'Pode editar o conteúdo do quadro.',
      canOnlyViewBoard: 'Só pode visualizar o quadro.',
      cardActions_title: 'Ações do Cartão',
      cardNotFound_title: 'Cartão não encontrado',
      cardOrActionAreDeleted: 'Cartão ou ação foram excluídos.',
      color: 'Cor',
      createBoard_title: 'Criar Quadro',
      createLabel_title: 'Criar Rótulo',
      createNewOneOrSelectExistingOne: 'Criar um novo ou selecionar<br />um existente.',
      createProject_title: 'Criar Projeto',
      createTextFile_title: 'Criar Arquivo de Texto',
      currentPassword: 'Senha atual',
      dangerZone_title: 'Zona de Perigo',
      date: 'Data',
      dueDate_title: 'Data de Vencimento',
      deleteAttachment_title: 'Excluir Anexo',
      deleteBoard_title: 'Excluir Quadro',
      deleteCard_title: 'Excluir Cartão',
      deleteComment_title: 'Excluir Comentário',
      deleteLabel_title: 'Excluir Rótulo',
      deleteList_title: 'Excluir Lista',
      deleteProject_title: 'Excluir Projeto',
      deleteTask_title: 'Excluir Tarefa',
      deleteUser_title: 'Excluir Usuário',
      description: 'Descrição',
      detectAutomatically: 'Detectar automaticamente',
      dropFileToUpload: 'Solte o arquivo para enviar',
      editor: 'Editor',
      editAttachment_title: 'Editar Anexo',
      editAvatar_title: 'Editar Avatar',
      editBoard_title: 'Editar Quadro',
      editDueDate_title: 'Editar Data de Vencimento',
      editEmail_title: 'Editar E-mail',
      editInformation_title: 'Editar Informações',
      editLabel_title: 'Editar Rótulo',
      editPassword_title: 'Editar Senha',
      editPermissions_title: 'Editar Permissões',
      editStopwatch_title: 'Editar Cronômetro',
      editUsername_title: 'Editar Nome de Usuário',
      email: 'E-mail',
      emailAlreadyInUse: 'E-mail já está em uso',
      enterCardTitle: 'Digite o título do cartão... [Ctrl+Enter] para abrir automaticamente.',
      enterDescription: 'Digite a descrição...',
      enterFilename: 'Digite o nome do arquivo',
      enterListTitle: 'Digite o título da lista...',
      enterProjectTitle: 'Digite o título do projeto',
      enterTaskDescription: 'Digite a descrição da tarefa...',
      filterByLabels_title: 'Filtrar por Rótulos',
      filterByMembers_title: 'Filtrar por Membros',
      fromComputer_title: 'Do Computador',
      fromTrello: 'Do Trello',
      general: 'Geral',
      hours: 'Horas',
      importBoard_title: 'Importar Quadro',
      invalidCurrentPassword: 'Senha atual inválida',
      labels: 'Rótulos',
      language: 'Idioma',
      leaveBoard_title: 'Sair do Quadro',
      leaveProject_title: 'Sair do Projeto',
      list: 'Lista',
      listActions_title: 'Ações da Lista',
      managers: 'Gerentes',
      members: 'Membros',
      minutes: 'Minutos',
      moveCard_title: 'Mover Cartão',
      name: 'Nome',
      newEmail: 'Novo e-mail',
      newPassword: 'Nova senha',
      newUsername: 'Novo nome de usuário',
      noConnectionToServer: 'Sem conexão com o servidor',
      noBoards: 'Sem quadros',
      noLists: 'Sem listas',
      noProjects: 'Sem projetos',
      notifications: 'Notificações',
      noUnreadNotifications: 'Nenhuma notificação não lida.',
      openBoard_title: 'Abrir Quadro',
      optional_inline: 'opcional',
      organization: 'Organização',
      phone: 'Telefone',
      preferences: 'Preferências',
      pressPasteShortcutToAddAttachmentFromClipboard:
        'Dica: pressione Ctrl-V (Cmd-V no Mac) para adicionar um anexo da área de transferência.',
      project: 'Projeto',
      projectNotFound_title: 'Projeto não encontrado',
      removeManager_title: 'Remover Gerente',
      removeMember_title: 'Remover Membro',
      searchLabels: 'Pesquisar rótulos...',
      searchMembers: 'Pesquisar membros...',
      searchUsers: 'Pesquisar usuários...',
      seconds: 'Segundos',
      selectBoard: 'Selecionar quadro',
      selectList: 'Selecionar lista',
      selectPermissions_title: 'Selecionar Permissões',
      selectProject: 'Selecionar projeto',
      settings: 'Configurações',
      stopwatch: 'Cronômetro',
      subscribeToMyOwnCardsByDefault: 'Inscrever-se automaticamente em meus próprios cartões',
      taskActions_title: 'Ações da Tarefa',
      tasks: 'Tarefas',
      thereIsNoPreviewAvailableForThisAttachment:
        'Não há pré-visualização disponível para este anexo.',
      time: 'Tempo',
      title: 'Título',
      userActions_title: 'Ações do Usuário',
      userAddedThisCardToList: '<0>{{user}}</0><1> adicionou este cartão a {{list}}</1>',
      userLeftNewCommentToCard:
        '{{user}} deixou um novo comentário «{{comment}}» em <2>{{card}}</2>',
      userMovedCardFromListToList: '{{user}} moveu <2>{{card}}</2> de {{fromList}} para {{toList}}',
      userMovedThisCardFromListToList:
        '<0>{{user}}</0><1> moveu este cartão de {{fromList}} para {{toList}}</1>',
      username: 'Nome de usuário',
      usernameAlreadyInUse: 'Nome de usuário já está em uso',
      users: 'Usuários',
      version: 'Versão',
      viewer: 'Visualizador',
      writeComment: 'Escreva um comentário...',
    },

    action: {
      addAnotherCard: 'Adicionar outro cartão',
      addAnotherList: 'Adicionar outra lista',
      addAnotherTask: 'Adicionar outra tarefa',
      addCard: 'Adicionar cartão',
      addCard_title: 'Adicionar Cartão',
      addComment: 'Adicionar comentário',
      addList: 'Adicionar lista',
      addMember: 'Adicionar membro',
      addMoreDetailedDescription: 'Adicionar descrição mais detalhada',
      addTask: 'Adicionar tarefa',
      addToCard: 'Adicionar ao cartão',
      addUser: 'Adicionar usuário',
      createBoard: 'Criar quadro',
      createFile: 'Criar arquivo',
      createLabel: 'Criar rótulo',
      createNewLabel: 'Criar novo rótulo',
      createProject: 'Criar projeto',
      delete: 'Excluir',
      deleteAttachment: 'Excluir anexo',
      deleteAvatar: 'Excluir avatar',
      deleteBoard: 'Excluir quadro',
      deleteCard: 'Excluir cartão',
      deleteCard_title: 'Excluir Cartão',
      deleteComment: 'Excluir comentário',
      deleteImage: 'Excluir imagem',
      deleteLabel: 'Excluir rótulo',
      deleteList: 'Excluir lista',
      deleteList_title: 'Excluir Lista',
      deleteProject: 'Excluir projeto',
      deleteProject_title: 'Excluir Projeto',
      deleteTask: 'Excluir tarefa',
      deleteTask_title: 'Excluir Tarefa',
      deleteUser: 'Excluir usuário',
      edit: 'Editar',
      editDueDate_title: 'Editar Data de Vencimento',
      editDescription_title: 'Editar Descrição',
      editEmail_title: 'Editar E-mail',
      editInformation_title: 'Editar Informações',
      editPassword_title: 'Editar Senha',
      editPermissions: 'Editar permissões',
      editStopwatch_title: 'Editar Cronômetro',
      editTitle_title: 'Editar Título',
      editUsername_title: 'Editar Nome de Usuário',
      hideDetails: 'Ocultar detalhes',
      import: 'Importar',
      leaveBoard: 'Sair do quadro',
      leaveProject: 'Sair do projeto',
      logOut_title: 'Sair',
      makeCover_title: 'Tornar Capa',
      move: 'Mover',
      moveCard_title: 'Mover Cartão',
      remove: 'Remover',
      removeBackground: 'Remover fundo',
      removeCover_title: 'Remover Capa',
      removeFromBoard: 'Remover do quadro',
      removeFromProject: 'Remover do projeto',
      removeManager: 'Remover gerente',
      removeMember: 'Remover membro',
      save: 'Salvar',
      showAllAttachments: 'Mostrar todos os anexos ({{hidden}} ocultos)',
      showDetails: 'Mostrar detalhes',
      showFewerAttachments: 'Mostrar menos anexos',
      start: 'Iniciar',
      stop: 'Parar',
      subscribe: 'Inscrever-se',
      unsubscribe: 'Cancelar inscrição',
      uploadNewAvatar: 'Enviar novo avatar',
      uploadNewImage: 'Enviar nova imagem',
    },
  },
};

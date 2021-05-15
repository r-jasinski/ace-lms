import Vue from 'vue'

const firebaseErrorsCode = {
  defaultError: 'Por favor procure o administrador do sistema',
  'auth/invalid-email': 'Endereço de email inválido ou não encontrado',
  'auth/user-not-found': 'Nome do usuário não encontrado',
  'auth/wrong-password': 'Nome do usuário ou senha incorretos',
  'auth/invalid-action-code': 'O link de cadastro expirou ou já foi usado',
  'auth/argument-error': 'O link de cadastro é inválido!',
  'auth/weak-password': 'A senha deve conter pelo menos 6 caracteres',
  'auth/requires-recent-login':
    'Atualizar a senha é confidencial e requer autenticação recente. Faça login e tente novamente!'
}

export const handleFirebaseErrors = (errorCode, action) => {
  const actionText = action || 'realizar a operação'
  const errorMessage = firebaseErrorsCode[errorCode]
    ? `Erro! ${firebaseErrorsCode[errorCode]}`
    : `Erro ao ${actionText}. ${firebaseErrorsCode.defaultError}`
  Vue.$toast(errorMessage, {
    type: 'error'
  })
}

export const handleToonifyErrors = () => {
  const errorMessage =
    'Erro ao processar a imagem. Por favor, envie um arquivo conforme os requisitos'
  Vue.$toast(errorMessage, {
    type: 'error'
  })
}

import Vue from 'vue'

const firebaseErrorsCode = {
  defaultError: 'Ocorreu um erro, por favor procure o administrador do sistema',
  'auth/invalid-email': 'Endereço de email inválido ou não encontrado',
  'auth/user-not-found': 'Nome do usuário não encontrado',
  'auth/wrong-password': 'Nome do usuário ou senha incorretos',
  'auth/invalid-action-code': 'O link de cadastro expirou ou já foi usado',
  'auth/weak-password': 'A senha deve conter pelo menos 6 caracteres'
}

export const handleFirebaseErrors = errorCode => {
  const errorMessage =
    firebaseErrorsCode[errorCode] || firebaseErrorsCode.defaultError
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

import { helpers } from 'vuelidate/lib/validators'

export const noSpaces = helpers.regex('noSpaces', /^\S*$/)

export const isTrueImage = file => {
  if (!file) {
    return true
  }
  return file.type.startsWith('image')
}

export const isLessThan2MB = file => {
  if (!file) {
    return true
  }
  return file.size < 2097152
}

export const vuelidateErrorExtractorOptions = {
  i18n: false,
  messages: {
    email: '{attribute} não é válido!',
    isTrueImage: '{attribute} deve ser uma imagem!',
    maxLength: '{attribute} deve ter no máximo {max} caracteres!',
    minLength: '{attribute} deve ter pelo menos {min} caracteres!',
    noSpaces: '{attribute} não deve conter espaços!',
    required: '{attribute} é obrigatório!',
    sameAsPassword: 'Senhas devem ser iguais!',
    isLessThan2MB: '{attribute} deve ser menor que 2MB!'
  },
  attributes: {
    email: 'Email',
    file: 'Arquivo',
    password: 'Senha',
    passwordConfirm: 'Confirme a senha',
    title: 'Título',
    body: 'Conteúdo',
    user: 'Usuário'
  }
}

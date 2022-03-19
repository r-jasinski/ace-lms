import { helpers } from 'vuelidate/lib/validators'

export const noSpaces = helpers.regex('noSpaces', /^\S*$/)
export const isKeywordValid = helpers.regex('isKeywordValid', /^[a-z0-9_ ]*$/i)

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
    alphaNum: '{attribute} deve conter apenas espaços, letras ou números!',
    email: '{attribute} não é válido!',
    isKeywordValid:
      '{attribute} deve conter apenas espaços, letras ou números!',
    isLessThan2MB: '{attribute} deve ser menor que 2MB!',
    isTrueImage: '{attribute} deve ser uma imagem!',
    maxLength: '{attribute} deve ter no máximo {max} caracteres!',
    minLength: '{attribute} deve ter pelo menos {min} caracteres!',
    noSpaces: '{attribute} não deve conter espaços!',
    required: '{attribute} é obrigatório!',
    sameAsPassword: 'Senhas devem ser iguais!',
    url: '{attribute} inválida!'
  },
  attributes: {
    body: 'Conteúdo',
    email: 'Email',
    file: 'Arquivo',
    keywords: 'Palavras-chave',
    password: 'Senha',
    passwordConfirm: 'Confirme a senha',
    title: 'Título',
    url: 'URL',
    user: 'Usuário'
  }
}

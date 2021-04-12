export default {
  data() {
    return {
      inputs: [
        {
          type: 'text',
          placeholder: 'Usuário',
          autocomplete: 'given-name',
          icon: 'user',
          meta: 'displayName'
        },
        {
          type: 'email',
          placeholder: 'E-mail',
          autocomplete: 'email',
          icon: 'at',
          meta: 'email'
        },
        {
          type: 'password',
          placeholder: 'Senha',
          autocomplete: 'new-password',
          icon: 'key',
          meta: 'password'
        },
        {
          type: 'password',
          placeholder: 'Confirmar Senha',
          autocomplete: 'new-password',
          icon: 'key',
          meta: 'passwordConfirm'
        }
      ]
    }
  }
}

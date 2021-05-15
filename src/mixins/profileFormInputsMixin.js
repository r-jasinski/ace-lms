export default {
  data() {
    return {
      inputs: [
        {
          type: 'text',
          placeholder: 'Usuário',
          autocomplete: 'given-name',
          icon: 'user',
          meta: 'displayName',
          validator: 'displayName',
          name: 'user'
        },
        {
          type: 'email',
          placeholder: 'E-mail',
          autocomplete: 'email',
          icon: 'at',
          meta: 'email',
          validator: 'email',
          name: 'email'
        },
        {
          type: 'password',
          placeholder: 'Senha',
          autocomplete: 'new-password',
          icon: 'key',
          meta: 'password',
          validator: 'password',
          name: 'password'
        },
        {
          type: 'password',
          placeholder: 'Confirmar Senha',
          autocomplete: 'new-password',
          icon: 'key',
          meta: 'passwordConfirm',
          validator: 'passwordConfirm',
          name: 'password'
        }
      ]
    }
  }
}

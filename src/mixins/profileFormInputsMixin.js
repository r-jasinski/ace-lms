export default {
  data() {
    return {
      inputs: [
        {
          autocomplete: 'given-name',
          autofocus: true,
          icon: 'user',
          id: 'user-name',
          meta: 'displayName',
          name: 'user',
          placeholder: 'Usuário',
          type: 'text',
          validator: 'displayName'
        },
        {
          autocomplete: 'email',
          disabled: true,
          icon: 'at',
          id: 'user-email',
          meta: 'email',
          name: 'email',
          placeholder: 'E-mail',
          type: 'email',
          validator: 'email'
        },
        {
          autocomplete: 'new-password',
          disabled: true,
          icon: 'key',
          id: 'user-new-password',
          meta: 'password',
          name: 'password',
          placeholder: 'Senha',
          type: 'password',
          validator: 'password'
        },
        {
          autocomplete: 'new-password',
          disabled: true,
          icon: 'key',
          id: 'user-new-password-confirm',
          meta: 'passwordConfirm',
          name: 'password',
          placeholder: 'Confirmar Senha',
          type: 'password',
          validator: 'passwordConfirm'
        }
      ]
    }
  }
}

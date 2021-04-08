export default {
  data() {
    return {
      inputs: [
        {
          type: 'text',
          placeholder: 'Usuário',
          autocomplete: 'given-name',
          icon: 'user',
          value: 'jan.kowalski'
        },
        {
          type: 'email',
          placeholder: 'E-mail',
          autocomplete: 'email',
          icon: 'at',
          value: 'jan@email.com'
        },
        {
          type: 'password',
          placeholder: 'Senha',
          autocomplete: 'current-password',
          icon: 'key',
          value: 'kurwa'
        },
        {
          type: 'text',
          placeholder: 'Imagem',
          autocomplete: 'photo',
          icon: 'image',
          value: 'jan.jpeg'
        }
      ]
    }
  }
}

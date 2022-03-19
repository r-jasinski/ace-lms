export default {
  data() {
    return {
      menuBarButtons: [
        {
          active: 'bold',
          command: 'bold',
          icon: 'bold',
          ariaLabel: 'Negrito'
        },
        {
          active: 'italic',
          command: 'italic',
          icon: 'italic',
          ariaLabel: 'Itálico'
        },
        {
          active: 'strike',
          command: 'strike',
          icon: 'strikethrough',
          ariaLabel: 'Riscado '
        },
        {
          active: 'underline',
          command: 'underline',
          icon: 'underline',
          ariaLabel: 'Sublinhado'
        },
        {
          active: 'code',
          command: 'code',
          icon: 'code',
          ariaLabel: 'Código'
        },
        {
          active: 'paragraph',
          command: 'paragraph',
          icon: 'paragraph',
          ariaLabel: 'Parágrafo'
        },
        {
          active: 'heading',
          command: 'heading',
          icon: 'heading',
          level: 1,
          ariaLabel: 'Título'
        },
        {
          active: 'bullet_list',
          command: 'bullet_list',
          icon: 'list-ul',
          ariaLabel: 'Lista'
        },
        {
          active: 'ordered_list',
          command: 'ordered_list',
          icon: 'list-ol',
          ariaLabel: 'Lista Ordenada'
        },
        {
          active: 'blockquote',
          command: 'blockquote',
          icon: 'quote-right',
          ariaLabel: 'Citação'
        },
        {
          active: 'code_block',
          command: 'code_block',
          icon: 'terminal',
          ariaLabel: 'Bloco de Código'
        },
        { command: 'undo', icon: 'undo', ariaLabel: 'Desfazer' },
        { command: 'redo', icon: 'redo', ariaLabel: 'Refazer' }
      ]
    }
  }
}

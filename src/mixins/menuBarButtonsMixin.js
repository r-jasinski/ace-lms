export default {
  data() {
    return {
      menuBarButtons: [
        { active: 'bold', command: 'bold', icon: 'bold' },
        { active: 'italic', command: 'italic', icon: 'italic' },
        { active: 'strike', command: 'strike', icon: 'strikethrough' },
        { active: 'underline', command: 'underline', icon: 'underline' },
        { active: 'code', command: 'code', icon: 'code' },
        { active: 'paragraph', command: 'paragraph', icon: 'paragraph' },
        { active: 'heading', command: 'heading', icon: 'heading', level: 1 },
        { active: 'bullet_list', command: 'bullet_list', icon: 'list-ul' },
        { active: 'ordered_list', command: 'ordered_list', icon: 'list-ol' },
        { active: 'blockquote', command: 'blockquote', icon: 'quote-right' },
        { active: 'code_block', command: 'code_block', icon: 'terminal' },
        { command: 'undo', icon: 'undo' },
        { command: 'redo', icon: 'redo' }
      ]
    }
  }
}

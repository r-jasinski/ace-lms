<template>
  <form-group :validator="$v.html" name="title" :messages="localMessages">
    <div
      :class="[
        'editor-title',
        { 'editor-title--editable': editable, 'editor-title__error': $v.$error }
      ]"
    >
      <editor-content class="editor-title__content" :editor="editor" />
    </div>
  </form-group>
</template>

<script>
import { Editor, EditorContent } from 'tiptap'
import { Heading, Focus, Placeholder } from 'tiptap-extensions'
import { maxLength, minLength, required } from 'vuelidate/lib/validators'

export default {
  name: 'EditorTitle',

  components: {
    EditorContent
  },

  props: {
    content: { type: String, default: '' },
    editable: { type: Boolean, default: true },
    placeholder: { type: String, default: '' }
  },

  data() {
    return {
      html: '',
      localMessages: {
        minLength: '{attribute} deve ter pelo menos 16 caracteres!'
      },
      editor: new Editor({
        editable: true,
        extensions: [
          new Heading({ levels: [1] }),
          new Focus({
            className: 'has-focus',
            nested: true
          }),
          new Placeholder({
            emptyEditorClass: 'is-editor-empty',
            emptyNodeClass: 'is-empty',
            emptyNodeText: ''
          })
        ],
        autoFocus: true,
        onTransaction: ({ getHTML }) => {
          if (
            !this.editor.isActive.heading({ level: 1 }) &&
            this.html !== '<h1></h1>'
          ) {
            this.editor.commands.heading({ level: 1 })
          }
          this.html = getHTML()
          if (this.html === '<h1></h1>') {
            this.editor.commands.heading({ level: 1 })
          }
          if (this.html !== '<p></p>' && this.editable) {
            this.$v.html.$touch()
          }
        },
        onBlur: () => {
          if (this.html && this.editable) {
            this.$emit('input', this.html)
          }
        }
      })
    }
  },

  computed: {
    hasError() {
      return this.$v.$error
    }
  },

  validations: {
    html: { maxLength: maxLength(160), minLength: minLength(23), required }
  },

  watch: {
    editable() {
      this.editor.setOptions({ editable: this.editable })
    },
    content() {
      this.editor.setContent(this.content)
    },

    hasError() {
      this.$emit('title-has-error', this.hasError)
    }
  },

  mounted() {
    this.editor.extensions.options.placeholder.emptyNodeText = this.placeholder
    this.editor.setContent(this.content)
    this.editor.setOptions({ editable: this.editable })
  },

  beforeDestroy() {
    this.editor.destroy()
  }
}
</script>

<style>
.editor-title {
  border-radius: 18px;
  border: none;
  padding: 10px;
  user-select: text;
}

.editor-title__error {
  border: 1px solid var(--danger) !important;
}

.form-error,
.is-visible {
  display: flex;
  flex-direction: column;
  color: var(--danger);
  font-size: 0.8em;
  margin-left: 16px;
  max-width: 268px;
}

.editor-title--editable {
  border: 1px solid var(--dark-50);
}

.editor-title--editable:focus-within {
  border: 1px solid var(--dark);
}

.ProseMirror-focused {
  outline: none;
}

.ProseMirror,
.ProseMirror-focused {
  outline: none !important;
}

.editor-title p.is-editor-empty:first-child::before {
  color: #aaa;
  content: attr(data-empty-text);
  float: left;
  font-style: italic;
  height: 0;
  pointer-events: none;
}
</style>

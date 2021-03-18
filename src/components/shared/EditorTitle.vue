<template>
  <div class="editor-title" :class="{ 'editor-title--editable': editable }">
    <editor-content class="editor-title__content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from 'tiptap'
import { Heading, Focus, Placeholder } from 'tiptap-extensions'

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
            emptyNodeText: '',
            showOnlyWhenEditable: true,
            showOnlyCurrent: true
          })
        ],
        autoFocus: true,
        content: '',
        onUpdate: ({ getHTML }) => {
          this.html = getHTML()
          this.content = this.html === '<h1></h1>' ? '' : this.html
        }
      })
    }
  },

  watch: {
    editable() {
      this.editor.setOptions({ editable: this.editable })
    },
    content() {
      !this.editor.isActive.heading({ level: 1 }) &&
        this.editor.commands.heading({ level: 1 })
      !this.content && this.editor.commands.heading({ level: 1 })
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

.editor-title--editable {
  border: 1px solid var(--dark-50);
}

.editor-title--editable:focus-within {
  border: 1px solid var(--dark);
}

.editor-title__menubar {
  display: flex;
  flex-wrap: wrap;
  gap: 1%;
}

.editor-title__button {
  color: var(--dark);
  background-color: rgba(77, 221, 240, 0);
  width: 35px;
  height: 35px;
  border: none;
  outline: none;
  opacity: 0.7;
}

.is-active {
  color: var(--primary);
  opacity: 0.9;
}

.editor-title__button:hover {
  background-color: rgba(0, 225, 255, 0.082);
  opacity: 1;
  border-radius: 5px;
}

.editor-title__content blockquote {
  border-left: 3px solid var(--primary);
  opacity: 0.8;
  padding-left: 0.8rem;
  font-style: italic;
}

.editor-title__content pre {
  background-color: var(--primary);
  padding: 1%;
  border-radius: 5px;
}

.ProseMirror-focused {
  outline: none;
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

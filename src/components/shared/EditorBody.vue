<template>
  <div class="editor" :class="{ 'editor--editable': editable }">
    <editor-menu-bar
      v-if="editable"
      :editor="editor"
      v-slot="{ commands, isActive }"
    >
      <div class="editor__menubar">
        <button
          class="editor__button"
          @click="showImagePrompt(commands.image)"
          :class="{ 'is-active': isActive.image() }"
        >
          <font-awesome-icon icon="image" />
        </button>
        <button
          v-for="({ active, command, icon, level }, index) in menuBarButtons"
          :key="`${index}-${icon}`"
          class="editor__button"
          :class="{
            'is-active': active && isActive[active]()
          }"
          @click="commands[command]({ level })"
        >
          <font-awesome-icon :icon="icon" />
        </button>
      </div>
    </editor-menu-bar>
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import menuBarButtonsMixin from '@/mixins/menuBarButtonsMixin'
import {
  Blockquote,
  Bold,
  BulletList,
  Code,
  CodeBlock,
  Focus,
  HardBreak,
  Heading,
  History,
  HorizontalRule,
  Image,
  Italic,
  Link,
  ListItem,
  OrderedList,
  Placeholder,
  Strike,
  TodoItem,
  TodoList,
  Underline
} from 'tiptap-extensions'

export default {
  name: 'EditorBody',

  components: {
    EditorContent,
    EditorMenuBar
  },

  mixins: [menuBarButtonsMixin],

  props: {
    content: { type: String, default: '' },
    editable: { type: Boolean, default: true },
    placeholder: { type: String, default: '' },
    sendData: { type: Boolean, default: false }
  },

  data() {
    return {
      html: '',
      editor: new Editor({
        editable: true,
        extensions: [
          new Blockquote(),
          new Bold(),
          new BulletList(),
          new Code(),
          new CodeBlock(),
          new Focus({
            className: 'has-focus',
            nested: true
          }),
          new HardBreak(),
          new Heading({ levels: [1] }),
          new History(),
          new HorizontalRule(),
          new Image(),
          new Italic(),
          new Link(),
          new ListItem(),
          new OrderedList(),
          new Placeholder({
            emptyEditorClass: 'is-editor-empty',
            emptyNodeClass: 'is-empty',
            emptyNodeText: '',
            showOnlyWhenEditable: true,
            showOnlyCurrent: true
          }),
          new Strike(),
          new TodoItem(),
          new TodoList(),
          new Underline()
        ],
        autoFocus: false,
        onTransaction: ({ getHTML }) => {
          this.html = getHTML()
        },
        onBlur: () => {
          if (this.html) {
            this.$emit('input', this.html)
          }
        }
      })
    }
  },

  watch: {
    editable() {
      this.editor.setOptions({ editable: this.editable })
    },
    content() {
      this.editor.setContent(this.content)
    }
  },

  mounted() {
    this.editor.extensions.options.placeholder.emptyNodeText = this.placeholder
    this.editor.setContent(this.content)
    this.editor.setOptions({ editable: this.editable })
  },

  beforeDestroy() {
    this.editor.destroy()
  },

  methods: {
    showImagePrompt() {
      const src = prompt('Enter the url of your image here')
      src && this.editor.commands.image({ src })
    }
  }
}
</script>

<style>
.editor {
  border-radius: 18px;
  border: none;
  margin-top: 25px;
  padding: 10px;
  user-select: text;
}

.editor--editable {
  border: 1px solid var(--dark-50);
}

.editor--editable:focus-within {
  border: 1px solid var(--dark);
}

.editor__menubar {
  display: flex;
  flex-wrap: wrap;
  gap: 1%;
}

.editor__button {
  background-color: transparent;
  border: none;
  color: var(--dark);
  height: 35px;
  opacity: 0.7;
  outline: none;
  width: 35px;
}

.editor__content {
  min-height: 75px;
}

.is-active {
  color: var(--primary);
  opacity: 0.9;
}

.editor__button:hover {
  background-color: rgba(0, 225, 255, 0.082);
  border-radius: 5px;
  opacity: 1;
}

.editor__content blockquote {
  border-left: 3px solid var(--primary);
  font-style: italic;
  opacity: 0.8;
  padding-left: 0.8rem;
}

.editor__content img {
  height: 100%;
  width: 100%;
}

.editor__content pre {
  background-color: var(--primary);
  color: #2c3e50;
  border-radius: 5px;
  padding: 1%;
}

.ProseMirror-focused {
  outline: none;
}

.editor__content p.is-editor-empty:first-child::before {
  color: #aaa;
  content: attr(data-empty-text);
  float: left;
  font-style: italic;
  height: 0;
  pointer-events: none;
}
</style>

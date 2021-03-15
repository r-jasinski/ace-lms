<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
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
            'is-active': active && isActive[active]({ level })
          }"
          @click="commands[command]({ level })"
        >
          <div class="button__icon">
            <font-awesome-icon :icon="icon" />
          </div>
        </button>
      </div>
    </editor-menu-bar>
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import menuBarButtonsMixin from '@/mixins/editor/menuBarButtonsMixin'
import {
  Blockquote,
  BulletList,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  Image,
  ListItem,
  OrderedList,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Focus
} from 'tiptap-extensions'
export default {
  name: 'Editor',
  mixins: [menuBarButtonsMixin],
  components: {
    EditorContent,
    EditorMenuBar
  },
  data() {
    return {
      html: '',
      content: '',
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 4] }),
          new HorizontalRule(),
          new Image(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Focus({
            className: 'has-focus',
            nested: true
          })
        ],
        autoFocus: true,
        content: '',
        onUpdate: ({ getHTML }) => {
          this.html = getHTML()
          this.content = this.html === '<p></p>' ? '' : this.html
        }
      })
    }
  },
  methods: {
    showImagePrompt() {
      const src = prompt('Enter the url of your image here')
      if (src !== null) {
        this.editor.commands.image({ src })
      }
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  }
}
</script>

<style>
.editor {
  min-height: 10vh;
  border-radius: 18px;
  border: 1px solid var(--dark);
  margin-top: 25px;
  padding: 10px;
}

.editor__menubar {
  display: flex;
  flex-wrap: wrap;
  gap: 1%;
}

.editor__button {
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

.editor__button:hover {
  background-color: rgba(0, 225, 255, 0.082);
  opacity: 1;
  border-radius: 5px;
}

.editor__content blockquote {
  border-left: 3px solid var(--primary);
  opacity: 0.8;
  padding-left: 0.8rem;
  font-style: italic;
}

.editor__content pre {
  background-color: var(--primary);
  padding: 1%;
  border-radius: 5px;
}

.ProseMirror-focused {
  outline: none;
}
</style>

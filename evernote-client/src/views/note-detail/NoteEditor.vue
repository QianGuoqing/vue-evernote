<template>
  <div class="q-note-editor">
    <div ref="editor" style="text-align:left"></div>
  </div>
</template>

<script>
  import E from 'wangeditor'
  import { mapState } from 'vuex'
  export default {
    name: 'NoteEditor',
    data() {
      return {
        editorContent: ''
      }
    },
    computed: {
      ...mapState(['richText'])
    },
    methods: {
      getContent() {
        alert(this.editorContent)
      }
    },
    mounted() {
      var editor = new E(this.$refs.editor)
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
        this.$store.commit('setRichText', this.editorContent)
      }
      editor.create()
    }
  }
</script>

<style lang="stylus" scoped>

</style>
<template>
  <footer class="footer" v-once>Copyright &copy; {{getYear}} 13计科 ben All Rights Reserved</footer>
</template>
<script type="text/javascript">
  export default {
    computed: {
      getYear(){
        return new Date().getFullYear()
      }
    }
  }
</script>

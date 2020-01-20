<script>
  // This is our base component. It sets up the structure of the page and imports the two main components, ContentForm and Preview.

  import Preview from "./Preview.svelte";
  import ContentForm from "./ContentForm.svelte";
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    flex-direction: row-reverse;
  }

  .form,
  .preview {
    width: 600px;
  }

  .preview {
    border: 1px solid black;
  }
</style>

<!-- Styles in Svelte are automatically scoped to the component. -->
<main>
  <!-- 
    This element will receive a generated css class from Svelte as well as retaining the class we assign.
    This allows us to use a global style sheet if we choose to.
  -->
  <article class="form">
    <ContentForm />
  </article>

  <article class="preview">
    <Preview />
  </article>
</main>

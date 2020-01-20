<script>
  import FormElement from "./FormElement.svelte";

  // Textbox is a reusable component that takes its state from props.
  export let id;
  export let label;
  export let placeholder;
  export let value;
</script>

<!-- Every Textbox is wrapped in a FormElement to give them consistent spacing. -->
<FormElement>
  <label for={id}>{label}</label>
  <input type="text" {id} {placeholder} bind:value />
</FormElement>

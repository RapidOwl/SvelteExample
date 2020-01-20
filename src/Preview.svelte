<script>
  // A method that gets called after each component update.
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  // Preview imports the stores because it could sit at any point in our component hierarchy
  // and we only want one preview.
  import { hasImage } from "./stores/uiState.js";
  import {
    headline,
    bodyCopy,
    pollItems,
    imagePreviewUrl
  } from "./stores/properties.js";

  // Store the URL to our dog image.
  let dogUrl = "";

  // An example of a computed property (it powers some conditional CSS classes below).
  $: showPoll = $pollItems.length > 0;

  // Because we will only have one preview, we can update the stores here instead of in a
  // parent component.
  function removeImage() {
    hasImage.set(false);
    imagePreviewUrl.set("");
  }

  onMount(async () => {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const json = await response.json();
    dogUrl = json.message;
  });
</script>

<style>
  .preview-image {
    max-height: 400px;
    max-width: 400px;
  }

  .dog-image {
    height: 400px;
  }

  .hidePoll {
    display: none;
  }

  .showPoll {
    display: block;
  }
</style>

<h1>{$headline}</h1>
<p>{$bodyCopy}</p>

{#if $hasImage}
  <img class="preview-image" src={$imagePreviewUrl} alt="Post image" />
  <button on:click={removeImage}>Remove Image</button>
{/if}

{#if $pollItems.length > 0}
  <!-- Here we have two examples of ways we can do conditional classes. -->
  <div class:hidePoll={!showPoll} class:showPoll>
    <h3>Poll</h3>
    <!-- Svelte also provides loops. Here we're using the pollItem as the key so that Svelte can keep track. -->
    {#each $pollItems as pollItem (pollItem)}
      <p>
        {pollItem}
        <input type="checkbox" />
      </p>
    {/each}
  </div>
{/if}

{#if dogUrl}
  <!-- An example of a Svelte transition with options. -->
  <img
    transition:fade={{ duration: 2000 }}
    class="dog-image"
    src={dogUrl}
    alt="A random dog image" />
{/if}

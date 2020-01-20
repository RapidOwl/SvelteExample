<script>
  // Importing the components we want to reference.
  import FormElement from "./FormElement.svelte";
  import Textbox from "./Textbox.svelte";
  import Poll from "./Poll.svelte";

  // We store the various parts of our component's state in stores.
  // Each property is a store in its own right.
  // This makes it easier to read, maintain and reason about.
  import { hasImage, hasPoll } from "./stores/uiState.js";
  import {
    friendlyName,
    headline,
    bodyCopy,
    pollItems,
    newPollItem,
    imagePreviewUrl
  } from "./stores/properties.js";

  function loadImage(event) {
    let input = event.target;

    var reader = new FileReader();

    reader.onload = function(e) {
      // We set store properties with the set function.
      imagePreviewUrl.set(e.target.result);
      hasImage.set(true);
    };

    reader.readAsDataURL(input.files[0]);
  }

  function addVideo() {
    alert("We don't support videos yet");
  }

  function addPoll() {
    hasPoll.set(true);
  }

  function addPollItem(newPollItemFromPoll) {
    // Because array push/pop/etc don't trigger Svelte's reactivity, we use the spread operator to create a new array.
    pollItems.set([...$pollItems, newPollItemFromPoll]);
  }

  function removePollItem(item) {
    // See above. We use filter to create a new array that will trigger Svelte's reactivity.
    pollItems.set($pollItems.filter(x => x !== item));
  }
</script>

<!-- We don't need to wrap the Textbox in a FormElement because the Textbox component does this for us. -->
<Textbox
  id="friendlyName"
  label="Give your post a name (private only to you)"
  placeholder="Friendly name"
  bind:value={$friendlyName} />
<Textbox
  id="headline"
  label="Headline"
  placeholder="Headline"
  bind:value={$headline} />
<Textbox
  id="bodyCopy"
  label="Body Copy"
  placeholder="Body copy"
  bind:value={$bodyCopy} />
<!-- We can wrap arbitrary elements in a FormElement to give it the same spacing as the Textboxes. -->
<FormElement>
  <input type="file" on:change={loadImage} alt="Add an image" />
  <button on:click={addVideo}>Add Video</button>
  <button on:click={addPoll}>Add Poll</button>
</FormElement>

<!-- Svelte provides conditional operators that allow us to modify the component tree based on its state. -->
{#if !$hasPoll}
  <FormElement>
    <div>
      <button>Add Link</button>
      <p>(Links only available on pages without polls)</p>
    </div>
  </FormElement>
{:else}
  <FormElement>
    <div>
      <!--
        Poll is a stateless reusable component that relies on props to give it purpose.
        Some notes on the props:
        - We access the values of a store with a $ (this also serves to make their use reactive).
        - We pass through pollItems with a $ because they aren't modified in the poll and we just want to render the values.
        - We pass through newPollItem without a $ because we want to use it as a store inside the component.
        - addPollItem and removePollItem are functions we want to call back to.
        - maxPollItems is a fixed value.
       -->
      <Poll
        pollItems={$pollItems}
        {newPollItem}
        {addPollItem}
        {removePollItem}
        maxPollItems="5" />
    </div>
  </FormElement>
{/if}

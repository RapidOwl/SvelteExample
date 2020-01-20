<script>
  // TODO Might need to introduce IDs for poll items if we can't rely on unique poll item values.

  // Note the lack of store imports here. We want to be able to make this work with props instead
  // of making it specific to particular store properties. This allows us to use the component
  // multiple times on a given page.

  export let pollItems;
  export let newPollItem;
  export let addPollItem;
  export let removePollItem;
  export let maxPollItems;

  // We call back to the parent component to add the poll item because only the parent knows how its
  // state should be managed. Then we reset the newPollItem store passed into the component.
  function addPollItemAndReset() {
    if (!pollItems.includes($newPollItem)) {
      addPollItem($newPollItem);
      newPollItem.set("");
    } else {
      alert("Already exists");
    }
  }
</script>

<div class="poll">
  <!-- Svelte also provides loops. Here we're using the pollItem as the key so that Svelte can keep track. -->
  {#each pollItems as pollItem (pollItem)}
    <p>
      {pollItem}
      <!-- We pass the poll item into the callback function so it knows which poll item to remove. -->
      <button on:click={removePollItem(pollItem)}>Remove</button>
    </p>
  {:else}
    <p>Add an item to this poll</p>
  {/each}
</div>

<input
  type="text"
  disabled={pollItems.length >= maxPollItems}
  bind:value={$newPollItem} />
<!--
  We use multiple multiple logical operators to determine the element's disabled state 
  (or we could encapsulate more complex logic in a function). 
-->
<button
  disabled={pollItems.length >= maxPollItems || $newPollItem === ''}
  on:click={addPollItemAndReset}>
  Add Poll Item
</button>

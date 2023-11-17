<!--<script>
import games from "./Parts/arm.json";
//console.log(games);
let items = [
    { id: 1, text: "Item 1", disabled: false },
    { id: 2, text: "Item 2", disabled: true },
    { id: 3, text: "Item 3", disabled: false }
  ];
let columns = Object.keys(games[0]);
</script>
<div>
<table class="table">
    <thead>
      <tr>
        {#each columns as column}
          <th>{column}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each games as row}
        <tr>
          {#each columns as column (column)}
            <td>
              {#each items as item}
              <select id={items.id}>
                <option value={item.text}>{item.text}</option>
                </select>
              {/each}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>-->
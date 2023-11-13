<script>
import games from "./Parts/arm.json";
console.log(games);
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
            <td>{row[column]}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
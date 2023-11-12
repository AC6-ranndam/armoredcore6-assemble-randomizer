<script>
import games from "./parts.json";
let tableData = games[0]["arm"]
let columns = Object.keys(tableData[0]);
</script>
<div>
<table class="table">
    <thead>
      <tr>
        {#each columns as column (column)}
          <th>{column}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each tableData as row}
        <tr>
          {#each columns as column (column)}
            <td>{row[column]}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
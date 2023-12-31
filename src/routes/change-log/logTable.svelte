<script>
  import changeLog from "$lib/database/changeLog.json";
  console.log(Object.values(changeLog["更新履歴"]))
  let changeList = Object.values(changeLog["更新履歴"])
  const typeTranslation = {
    バグ修正:"error",
    機能追加:"info",
    機能変更:"warning",
    改善:"info",
    その他:"accent"
  };
</script>
<div class="overflow-x-auto">
<table class="table table-md table-pin-rows">
  <tbody>
    {#each changeList as change}
      <tr>
        <td>
          <div class="badge badge-{typeTranslation[change['内容の種類']]} badge-lg w-24">
          {change["内容の種類"]}
          </div>
        </td>
        <td>
          {change["更新日時"]}
        </td>
        <td>
          {change["詳細"]}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
</div>

<style>
  td {
    text-align: center;
  }
  div {
    display: flex;
    align-items: center;
}
</style>

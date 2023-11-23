<script>
import { assemble } from "$lib/assemble.js";
import { option,fixedParts,result} from "$lib/store.js";
function assembleCreate() {
    result.set(assemble($option,$fixedParts));
  }
</script>
<div class="btn-container">
    <button class="btn text-xl font-medium" on:click={assembleCreate}
      >アセンブル作成</button
    >
</div>
<style>
    .btn-container {
      display: flex;
      justify-content: center;
  
    }
</style>
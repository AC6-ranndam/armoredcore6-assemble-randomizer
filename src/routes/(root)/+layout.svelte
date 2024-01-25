<script>
    //メインページのレイアウトを構成するファイル
    import Header from "./Header.svelte";//他のページ構成要素を実際に配置するために読み込み
    import ResultTable from "./ResultTable.svelte";
</script>
<Header /><!--実際に読み込んだ要素を配置-->
<ResultTable />
<slot></slot>
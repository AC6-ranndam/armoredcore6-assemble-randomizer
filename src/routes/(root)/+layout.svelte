<script>
    import Header from "./Header.svelte";
    import ResultTable from "./ResultTable.svelte";
    import { loadTranslations } from '$lib/translations/translations';
	// 言語読み込み設定を追加
	const defaultLanguage = "en"
	loadTranslations(defaultLanguage, "/");
</script>
<Header />
<ResultTable />
<slot></slot>
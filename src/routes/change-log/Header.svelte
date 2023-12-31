<div class="navbar bg-base-100">
  <div class="flex-none">
    <div class="drawer">
      <input id="sideMenu" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <!-- Page content here -->
        <label for="sideMenu" class="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block h-5 w-5 stroke-current"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            /></svg
          >
        </label>
      </div>
      <div class="drawer-side">
        <label
          for="sideMenu"
          aria-label="close sidebar"
          class="drawer-overlay"
        />
        <ul class="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
          <!-- Sidebar content here -->
          <li><a href="/">ホーム</a></li>
          <li><a href="/change-log">更新履歴</a></li>
          <li>
            <a href="https://forms.gle/cJcMZ3sy6g31PYt88">お問い合わせ</a>
          </li>
          <li>
            <a href="https://github.com/y0329/armoredcore6-assemble-randomizer"
              >ソースコード・ヘルプ</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="flex-1">
    <div class="text-xl font-bold px-1">アーマードコア6　賽投げシステム</div>
  </div>
  <div class="flex-none">
  </div>
</div>

<style>
  .drawer-side {
    z-index: 100;
  }
</style>

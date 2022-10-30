(() => {
  const __tmpl__section0 = template //
  `<section class="main-section section-entry">
    <div class="container">
      <div class="section-entry__logo">
        <img
          src="https://cdngarenanow-a.akamaihd.net/webth/cdn/garena/gamertocoder/bmg-logo/03.png"
          alt=""
        />
      </div>

      <div class="section-entry__btns">
        <a class="btn btn--play-now" target="_blank" href="https://www.blockmango.com/">เล่นเลย!</a>
        <a class="btn btn--browse-minigames" href="#/minigames">มินิเกมส์</a>
      </div>
    </div>
  </section>`;

  const __tmpl__section1 = template //
  `<section class="main-section">
    <div class="container">
      <div class="banners">
        <div
          class="banner row-span-2"
          style="
            --banner-bg-url: url('https://cdngarenanow-a.akamaihd.net/webth/cdn/garena/gamertocoder/bmg-banner/02.png');
          "
        >
          <div class="banner__bg"></div>
          <div class="banner__icon">
            <img src="./img/blockmango.png" alt="" />
          </div>
          <div class="banner__content">
            <h1>Blockman GO</h1>
            <p>
            ยินดีต้อนรับสู่ Blockman GO! Blockman GO เป็น APP ฟรีที่มีทั้งเกมมินี่ เกม การแชท และหาเพื่อนได้ ท่าน 
            </p>
          </div>
        </div>
        <a
          class="banner"
          style="
            --banner-bg-url: url('https://cdngarenanow-a.akamaihd.net/webth/cdn/garena/gamertocoder/bmg-wallpaper/01.jpg');
          "
        >
          <div class="banner__bg"></div>
          <div class="banner__content">
            <h1>Customize</h1>
          </div>
        </a>
        <a
          href="https://www.blockmango.com/#/editor?from=platform".
          target="_blank"
          class="banner"
          style="
            --banner-bg-url: url('../img/banner2.png');
          "
        >
          <div class="banner__bg"></div>
          <div class="banner__content">
            <h1>Editor</h1>
          </div>
        </a>
      </div>
    </div>
  </section>`;

  /**
   * @typedef MinigameEntry
   * @type {object}
   * @property {number} no
   * @property {string} name
   * @property {string} icon
   * @property {string[]} genre
   * @property {string[] | null} images
   * @property {string} description
   *
   * @param {{ minigames: () => MinigameEntry[] | null }} props
   */
  function HomePage(props) {
    const root = document.createDocumentFragment();

    const el__sec0 = clone_template(__tmpl__section0);
    const el__sec1 = clone_template(__tmpl__section1);

    const minigames = create_memo(() => props.minigames()?.slice(0, 4) || []);

    const minigames_header = document.createElement('h3');
    minigames_header.textContent = 'มินิเกมส์แนะนำ';
    minigames_header.style.setProperty('font-size', '1.75rem');

    const minigames_link = document.createElement('a');
    minigames_link.href = '#/minigames';
    minigames_link.textContent = 'เพิ่มเติม';

    const el__minigame = __minigames_page({
      minigames,
      header: [minigames_header, minigames_link],
    });

    root.append(el__sec0, el__sec1, el__minigame);

    return root;
  }

  window.__home_page = HomePage;
})();

(() => {
  const __tmpl__sec0 = template //
  `<div class="container">
    <h1 class="minigame--title"></h1>
    <div class="minigame--backdrop"></div>

    <div class="minigame">
      <div class="minigame__top">
        <div class="minigame__top--icon">
          <img alt="" />
        </div>
        <p class="minigame__top--info"></p>
        <div class="minigame__top__genres"></div>
      </div>

      <div class="minigame__bot">
        <div class="minigame__preview"></div>
        <div class="minigame__preview--items"></div>
      </div>

    </div>
  </div>`;

  function MinigamePreviewItem(props) {
    const el = document.createElement('div');

    el.className = 'minigame__preview--item';
    el.style.setProperty('--image-url', `url('${props.image_url}')`);

    el.onclick = () => {
      props.set_preview_image_url(props.image_url);
      el.scrollIntoView();
    };

    create_effect(() => {
      el.classList.toggle('selected', props.preview_image_url() === props.image_url);
    });

    return el;
  }

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
   * @param {{ minigames: () => MinigameEntry[] | null, location: { params: Record<string, string>; pathname: string;} | null }} props
   */
  function MinigamePage(props) {
    const minigame = create_memo(() => {
      const minigame_no = parseInt(props.location.params.no);
      return props.minigames()?.find((e) => e.no === minigame_no);
    });

    const breadcrub_links = create_memo(() => {
      return [
        { label: 'Home', href: '#/' },
        { label: 'Minigames', href: '#/minigames' },
        { label: minigame()?.name, href: `#/minigame/${minigame()?.no}`, active: true },
      ];
    });
    const [preview_image_url, set_preview_image_url] = create_signal('');

    const el__sec0 = clone_template(__tmpl__sec0);

    const el__minigame_name = el__sec0.querySelector('.minigame--title');
    const el__minigame_icon_img = el__sec0.querySelector('.minigame__top--icon > img');
    const el__minigame_info = el__sec0.querySelector('p.minigame__top--info');
    const el__minigame_genres = el__sec0.querySelector('.minigame__top__genres');

    const el__minigame_preview = el__sec0.querySelector('.minigame__preview');
    const el__minigame_preview__items = el__sec0.querySelector('.minigame__preview--items');

    el__minigame_name.parentElement.insertBefore(
      __comp__breadcrub({ links: breadcrub_links }),
      el__minigame_name
    );

    create_effect(() => {
      el__minigame_preview.style.setProperty('--image-url', `url('${preview_image_url()}')`);
    });

    create_effect(() => {
      const _minigame = minigame();

      if (!_minigame) return;
      set_preview_image_url(_minigame.images?.[0]);

      el__minigame_name.textContent = _minigame.name;
      el__minigame_icon_img.src = _minigame.icon;
      el__minigame_info.textContent = _minigame.description;

      _minigame.genre.forEach((genre) => {
        const el__genre_pill = document.createElement('span');
        el__genre_pill.className = 'minigame--genre';
        el__genre_pill.textContent = genre;

        el__minigame_genres.append(el__genre_pill);
      });

      const minigame_preview_items =
        _minigame.images?.map((image_url) => {
          const el__preview_item = MinigamePreviewItem({
            image_url,
            preview_image_url,
            set_preview_image_url,
          });

          return el__preview_item;
        }) || [];

      el__minigame_preview__items.textContent = '';
      el__minigame_preview__items.append(...minigame_preview_items);
    });

    const fragments = document.createDocumentFragment();
    fragments.append(el__sec0);

    return fragments;
  }

  window.__minigame_page = MinigamePage;
})();

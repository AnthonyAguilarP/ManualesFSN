// Inicializa los números a partir del atributo data-index
    (function initIndexBubbles(){
      const features = document.querySelectorAll('.feature');

      features.forEach(feature => {
        const idx = feature.getAttribute('data-index') || '';
        const bubble = feature.querySelector('.index-bubble');
        if(bubble){ bubble.textContent = idx; }
      });

      // Animación de burbujas al entrar en pantalla
      if('IntersectionObserver' in window){
        const io = new IntersectionObserver((entries)=>{
          entries.forEach(entry=>{
            const bubble = entry.target.querySelector('.index-bubble');
            if(!bubble) return;
            if(entry.isIntersecting){
              bubble.classList.add('visible');
            } else {
              bubble.classList.remove('visible');
            }
          });
        }, {threshold: 0.25});
        features.forEach(f => io.observe(f));
      } else {
        document.querySelectorAll('.index-bubble').forEach(b => b.classList.add('visible'));
      }
    })();

    // ===== MODAL FUNCIONAL =====
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.getElementById('closeModal');

    // Abrir modal al hacer click en imagen
    document.querySelectorAll('.media img').forEach(img => {
      img.addEventListener('click', () => {
        modalImg.src = img.src;
        modal.classList.add('active');
      });
    });

    // Cerrar modal al hacer click en botón o fuera de la imagen
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });

    // Cerrar con tecla ESC
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') modal.classList.remove('active');
    });
    // ===== FAB MENU FUNCIONAL =====
  (function(){
    const fabWrap = document.querySelector('.fab-wrap');
    const fabBtn = document.getElementById('fabBtn');
    const fabMenu = document.getElementById('fab-menu');
    const fabIcon = document.getElementById('fabIcon');

    let open = false;

    function toggleMenu(force){
      open = typeof force === 'boolean' ? force : !open;
      fabMenu.classList.toggle('show', open);
      fabWrap.setAttribute('aria-expanded', String(open));
      fabMenu.setAttribute('aria-hidden', String(!open));
      fabBtn.setAttribute('aria-pressed', String(open));
      fabIcon.textContent = open ? '✕' : '＋';
      // when open, focus first item
      if(open){
        const first = fabMenu.querySelector('[role="menuitem"]');
        if(first) first.focus();
        document.addEventListener('click', onDocClick);
        document.addEventListener('keydown', onKeyDown);
      } else {
        document.removeEventListener('click', onDocClick);
        document.removeEventListener('keydown', onKeyDown);
        fabBtn.focus();
      }
    }

    function onDocClick(e){
      if(!fabWrap.contains(e.target)) toggleMenu(false);
    }

    function onKeyDown(e){
      if(e.key === 'Escape') toggleMenu(false);
      // simple arrow navigation
      const items = Array.from(fabMenu.querySelectorAll('[role="menuitem"]'));
      const idx = items.indexOf(document.activeElement);
      if(e.key === 'ArrowDown' || e.key === 'ArrowRight'){
        e.preventDefault();
        const next = items[(idx + 1) % items.length];
        next && next.focus();
      } else if(e.key === 'ArrowUp' || e.key === 'ArrowLeft'){
        e.preventDefault();
        const prev = items[(idx - 1 + items.length) % items.length];
        prev && prev.focus();
      }
    }

    fabBtn.addEventListener('click', (e)=>{
      e.stopPropagation();
      toggleMenu();
    });

    // Allow activating via Enter/Space
    fabBtn.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });

    // Close menu when a menu item is clicked (useful for single-page anchors)
    fabMenu.addEventListener('click', (e)=>{
      const link = e.target.closest('[role="menuitem"]');
      if(!link) return;
      // Small timeout so user sees the click before menu closes
      setTimeout(()=> toggleMenu(false), 120);
    });

    // initial state
    toggleMenu(false);
  })();
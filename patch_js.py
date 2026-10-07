import re

with open('js/app.js', 'r') as f:
    content = f.read()

new_lightbox = """
  initImageLightbox() {
    const clickableMedia = document.querySelectorAll('.pd-card-img, .pd-preview-img, [data-type="image"], [data-type="video"]');
    const modal = document.getElementById('video-modal');
    const modalTitle = document.getElementById('modal-video-title');
    const modalBody = document.querySelector('.modal-video-wrapper');
    const videoEl = document.getElementById('modal-video-element');
    const closeBtn = document.getElementById('btn-modal-close');

    if (!clickableMedia.length || !modal) return;

    // Backdrop click-to-close
    modal.addEventListener('click', (e) => {
      const dialogDimensions = modal.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        if (typeof modal.close === 'function') modal.close();
        else modal.removeAttribute('open');
      }
    });

    // Close button click and touchend
    if (closeBtn) {
      closeBtn.style.zIndex = '9999';
      closeBtn.style.pointerEvents = 'auto';
      const closeModal = (e) => {
        if (e) e.preventDefault();
        if (typeof modal.close === 'function') modal.close();
        else modal.removeAttribute('open');
      };
      closeBtn.addEventListener('click', closeModal);
      closeBtn.addEventListener('touchend', closeModal);
    }

    clickableMedia.forEach(media => {
      if (media.closest('a.pd-image-link')) return;

      media.addEventListener('click', () => {
        const type = media.getAttribute('data-type') || (media.tagName === 'VIDEO' ? 'video' : 'image');
        const src = media.getAttribute('src') || media.getAttribute('data-src');
        const alt = media.getAttribute('alt') || 'Asset Preview';

        if (modalTitle) modalTitle.textContent = alt;

        if (modalBody) {
          let lightboxImg = document.getElementById('lightbox-img-element');
          if (!lightboxImg) {
            lightboxImg = document.createElement('img');
            lightboxImg.id = 'lightbox-img-element';
            lightboxImg.style.maxWidth = '100%';
            lightboxImg.style.maxHeight = '80vh';
            lightboxImg.style.objectFit = 'contain';
            lightboxImg.style.borderRadius = '8px';
            modalBody.appendChild(lightboxImg);
          }

          if (type === 'video') {
            if (lightboxImg) lightboxImg.style.display = 'none';
            if (videoEl) {
              videoEl.style.display = 'block';
              videoEl.src = src;
              videoEl.play();
            }
          } else {
            if (videoEl) {
              videoEl.style.display = 'none';
              videoEl.pause();
            }
            if (lightboxImg) {
              lightboxImg.src = src;
              lightboxImg.alt = alt;
              lightboxImg.style.display = 'block';
            }
          }
        }

        if (typeof modal.showModal === 'function') {
          modal.showModal();
        } else {
          modal.setAttribute('open', 'true');
        }
      });
    });
  }
"""

content = re.sub(r'  initImageLightbox\(\) \{.*?\n  \}', new_lightbox.strip('\n'), content, flags=re.DOTALL)

with open('js/app.js', 'w') as f:
    f.write(content)

print("JS patch applied")

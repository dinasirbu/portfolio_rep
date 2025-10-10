export const getVisibleGallery = (gallery = []) => {
  if (!Array.isArray(gallery)) {
    return [];
  }

  let coverSkipped = false;

  return gallery.filter((image, index) => {
    if (coverSkipped === false) {
      if (index === 0) {
        coverSkipped = true;
        return false;
      }

      const source = typeof image?.src === 'string' ? image.src : '';
      if (source) {
        const fileName = source.split('/').pop()?.split('?')[0] ?? '';
        if (/-0?1(?=\.[^./]+$|$)/.test(fileName)) {
          coverSkipped = true;
          return false;
        }
      }
    }

    return true;
  });
};

export const getVisibleGalleryForWork = (work) => {
  const gallery = work?.caseStudy?.gallery;
  return getVisibleGallery(Array.isArray(gallery) ? gallery : []);
};

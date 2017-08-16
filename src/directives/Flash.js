export default {
  update(el, binding, vnode) {
    const colors = binding.value;

    vnode.context.$nextTick(() => {
      const $elMap = colors.map((color) => {
        const $el = el.querySelector(`#${color}`);
        return $el;
      });

      $elMap.forEach(($elem, index) => {
        setTimeout(() => {
          const $el = $elem;
          $el.className += ' Circles__item--flashit';
          setTimeout(() => {
            $el.className = 'Circles__item';
          }, 1000);
        }, 1000 * index);
      });
    });
  },
};

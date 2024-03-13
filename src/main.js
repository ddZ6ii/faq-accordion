/**
 * When using native HTML to implement an accordion, we cannot rely solely on using CSS to animate the transition between the collapsed and expanded states.
 *
 * The reason is that the 'open' attribute (automatically added to / removed from the <details> element upon clicking the <summary> element) does not make any transition between the 2 states. Hence it simply cannot be animated, just like the 'hidden' HTML attribute or the CSS 'display' property.
 *
 * Thus we need some JavaScript to modify this default behavior and ensure our animations/transitions have the time to run.
 *
 * Basically, we first define some CSS transitions (grid-template-rows, visibility and opacity) on the panel using 'expanded' as a custom attribute. Then we need to:
 * 1. prevent the default accordion behavior
 * 2. so we can first run our transitions prior toggling the 'open' attribute
 */

const btns = document.querySelectorAll('.accordion__toggle');

function onToggle(e) {
  const accordion = this.parentNode;
  const panel = this.nextElementSibling;

  /**
   * Expand/collapse selected panel by toggling the 'expanded' custom attribute (triggers panel visibility through CSS selector).
   *
   * 1. On open, stick to the default behavior (the 'open' attribute is automatically added to the <details> element).
   *
   * 2. On close, first prevent the default behavior (removing the 'open' attribute to the <details> element).
   *
   * 3. Then execute the CSS transition related to collapsing the panel.
   *
   * 4. Wait for the transition to end (one-time event!), and finally resume to the default behavior.
   */

  /* 1 */
  if (!accordion.open) {
    /* Firefox fix: delay to ensure the CSS transition occurs after the 'open' attribute is added. */
    setTimeout(() => {
      panel.setAttribute('expanded', 'true');
    }, 0);
  } else {
    /* 2 */
    e.preventDefault();
    /* 3 */
    panel.removeAttribute('expanded');
    /* 4 */
    panel.addEventListener(
      'transitionend',
      () => accordion.removeAttribute('open'),
      { once: true },
    );
  }
}

btns.forEach((btn) => btn.addEventListener('click', onToggle));

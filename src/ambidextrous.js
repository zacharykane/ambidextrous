Ambidextrous = (links, attach) => {
    window.addEventListener('deviceorientation', handleOrientation);
    const deviceWidth = document.body.innerWidth;

    function handleOrientation(e) {
        // document.querySelector('#console').textContent = e.gamma;
        if (e.gamma > 20) {
            ambidextrous.classList.add('right');
        }
        if (e.gamma < -20) {
            ambidextrous.classList.remove('right');
        }
    }

    document.body.addEventListener('click', throttledHandleOrientation());

    function debounceHandleOrientation() {
        let timer = null;
        return (e) => {
            clearTimeout(timer);
            console.log('no action');
            timer = setTimeout(() => {
                console.log('action');
            }, 1000);
        };
    }

    function throttledHandleOrientation() {
        let timer = null;
        let last = null;

        return (e) => {
            const now = Date.now();

            if (last && now < last + 1000) {
                clearTimeout(timer);

                timer = setTimeout(() => {
                    last = now;
                    console.log(`action`);
                }, 1000 - (now - last));
            } else {
                last = now;
                console.log('action');
            }
        };
    }

    const ambidextrous = document.createElement('div');
    ambidextrous.setAttribute('class', 'ambidextrous');

    const offCanvas = document.createElement('div');
    offCanvas.setAttribute('class', 'ambi-off-canvas');
    ambidextrous.appendChild(offCanvas);

    const list = document.createElement('ul');
    list.setAttribute('class', 'ambi-list');
    ambidextrous.appendChild(list);

    links.forEach((link) => {
        const anchorItem = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.setAttribute('href', link.href);
        anchor.textContent = link.label;
        anchorItem.appendChild(anchor);
        list.appendChild(anchorItem);
    });

    const trigger = document.createElement('div');
    trigger.setAttribute('class', 'ambi-trigger');
    trigger.textContent = 'O';

    trigger.addEventListener('click', (e) => {
        ambidextrous.classList.toggle('opened');
        trigger.textContent = trigger.textContent === 'O' ? 'X' : 'O';
    });
    ambidextrous.appendChild(trigger);

    return ambidextrous;
};

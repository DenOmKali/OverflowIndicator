class OverflowIndicator {
    constructor(listClass, containerClass) {
        this.listClass = listClass;
        this.containerClass = containerClass;
        this.init();
    }

    init() {
        window.addEventListener('load', () => this.checkOverflow());
        window.addEventListener('resize', () => this.checkOverflow());

        document.querySelectorAll(`.${this.listClass}`).forEach(tabs => {
            tabs.addEventListener('scroll', () => this.checkOverflow());
        });

        this.checkOverflow();
    }

    checkOverflow() {
        document.querySelectorAll(`.${this.containerClass}`).forEach(container => {
            const tabs = container.querySelector(`.${this.listClass}`);
            if (!tabs) return;

            const hasLeftOverflow = tabs.scrollLeft > 0;
            const hasRightOverflow = tabs.scrollLeft < tabs.scrollWidth - tabs.clientWidth - 1;

            if (hasLeftOverflow) {
                container.classList.add('has-left-overflow');
            } else {
                container.classList.remove('has-left-overflow');
            }

            if (hasRightOverflow) {
                container.classList.add('has-right-overflow');
            } else {
                container.classList.remove('has-right-overflow');
            }
        });
    }
}

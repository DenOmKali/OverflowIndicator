class OverflowIndicator {
    constructor(listClass, containerClass, color = '#000000') {
        this.listClass = listClass;
        this.containerClass = containerClass;
        this.color = color;
        this.injectStyles();
        this.init();
    }

    injectStyles() {
        const rgbaColor = this.hexToRgba(this.color, 0.2);

        const styles = `
                .${this.containerClass} {
                    width: 100%;
                    position: relative;
                    overflow: hidden;
                }
                .${this.containerClass}::before,
                .${this.containerClass}::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 30px;
                    height: 100%;
                    z-index: 1;
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    border-radius: 50%;
                }
                .${this.containerClass}::before {
                    left: -10px;
                    background: radial-gradient(circle at right, ${rgbaColor}, rgba(0, 0, 0, 0));
                }
                .${this.containerClass}::after {
                    right: -10px;
                    background: radial-gradient(circle at left, ${rgbaColor}, rgba(0, 0, 0, 0));
                }
                .${this.containerClass}.has-left-overflow::before,
                .${this.containerClass}.has-right-overflow::after {
                    opacity: 1;
                }
            `;

        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
    }

    hexToRgba(hex, alpha) {
        if (!/^#[0-9A-F]{6}$/i.test(hex)) {
            console.error('Invalid HEX color format');
            return `rgba(0, 0, 0, ${alpha})`;
        }

        hex = hex.replace(/^#/, '');
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
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
            const hasRightOverflow = tabs.scrollLeft < tabs.scrollWidth - tabs.clientWidth - 2;

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
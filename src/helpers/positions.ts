export const documentHeight = () => {
    if (document) {
        const $body = document.body;
        const $html = document.documentElement;

        return $html
            ? Math.max(
                $body.scrollHeight,
                $body.offsetHeight,
                $html.clientHeight,
                $html.scrollHeight,
                $html.offsetHeight
            )
            : 0;
    }

    return 0;
};

export const windowWidth = () => {
    return typeof window !== 'undefined' && document && document.documentElement
        ? window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
        : 0;
};

export const windowHeight = () => {
    return typeof window !== 'undefined' && document && document.documentElement
        ? window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
        : 0;
};

export const scrollTop = () => {
    return typeof window !== 'undefined' && document && document.documentElement
        ? window.pageYOffset || document.documentElement.scrollTop
        : 0;
};

export const scrollLeft = (element: Element | null) => {
    return element ? element.scrollLeft : (typeof window !== 'undefined' && document && document.documentElement
        ? window.pageYOffset || document.documentElement.scrollLeft
        : 0);
};

export const height = (element: Element | null) => {
    return element ? element.getBoundingClientRect().height : 0;
};

export const width = (element: Element) => {
    return element.getBoundingClientRect().width;
};

export const topPosition = (element: Element) => {
    const rect = element.getBoundingClientRect();

    return rect.top + scrollTop();
};

export const relativeTopPosition = (element: Element) => {
    return element.getBoundingClientRect().top;
};

export const bottomPosition = (element: Element) => {
    const rect = element.getBoundingClientRect();

    return rect.bottom + scrollTop();
};

export const leftPosition = (element: Element, container?: Element) => {
    const rect = element.getBoundingClientRect();
    const scrollLeftPosition =
        container ? scrollLeft(container) : (typeof window !== 'undefined' && document && document.documentElement
            ? window.pageXOffset || document.documentElement.scrollLeft
            : 0);

    return rect.left + scrollLeftPosition;
};

export const rightPosition = (element: Element) => {
    const rect = element.getBoundingClientRect();
    const widthOfWindow = windowWidth();

    return widthOfWindow - rect.right;
};

export const inViewport = (element: Element) => {
    const rect = element.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= windowHeight() &&
        rect.right <= windowWidth()
    );
};

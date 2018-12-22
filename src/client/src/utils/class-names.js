export const join = (...classNames) =>
    classNames.filter(className => className)
        .join(' ');

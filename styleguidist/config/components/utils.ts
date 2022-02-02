const userAgent = navigator.userAgent;
export const isIE = userAgent.indexOf('MSIE') !== -1 || userAgent.indexOf('Trident/') !== -1;

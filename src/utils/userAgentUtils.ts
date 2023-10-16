const {userAgent} = typeof window === 'undefined' ? {userAgent: 'node'} : navigator;

export const isIE = userAgent.indexOf('MSIE') !== -1 || userAgent.indexOf('Trident') !== -1 || userAgent.indexOf('Edge') !== -1; // Включает в себя Microsoft Edge Legacy
export const isOnlyIE = userAgent.indexOf('MSIE') !== -1 || userAgent.indexOf('Trident') !== -1;
export const isNode = userAgent === 'node';

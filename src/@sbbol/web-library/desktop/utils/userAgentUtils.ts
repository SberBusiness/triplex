const nav = typeof window === 'undefined' ? {userAgent: 'node', platform: 'node'} : navigator;
const userAgent = nav.userAgent;
export const isIE = userAgent.indexOf('MSIE') !== -1 || userAgent.indexOf('Trident/') !== -1 || userAgent.indexOf('Edge/') !== -1;
export const isOnlyIE = userAgent.indexOf('MSIE') !== -1 || userAgent.indexOf('Trident/') !== -1;
export const isNode = userAgent === 'node';

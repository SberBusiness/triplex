let counter = 0;

export const uniqueId = (): string => (++counter).toString();

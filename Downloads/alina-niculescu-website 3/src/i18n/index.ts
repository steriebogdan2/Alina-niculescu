import ro from './ro.json';
import en from './en.json';

export type Lang = 'ro' | 'en';
export type Dictionary = typeof ro;

export const dictionaries: Record<Lang, Dictionary> = { ro, en };

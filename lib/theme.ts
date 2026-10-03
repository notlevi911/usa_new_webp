export type ThemeName = 'light' | 'dark';

export const THEMES: Record<ThemeName, Record<string, string>> = {
  light: {
    paper: '#ebeee7',
    'paper-2': '#e3e7de',
    card: '#f3f5f0',
    ink: '#2b3a30',
    'ink-soft': '#3d4a41',
    muted: '#6b746c',
    line: '#c9cfc6',
    'line-2': '#d3d8cf',
    glass: 'rgba(235,238,231,.88)',
    deep: '#2b3a30',
    'on-deep': '#ebeee7',
    'on-deep-muted': '#a9b3aa',
    'deep-line': '#4a5a4f',
  },
  dark: {
    paper: '#121814',
    'paper-2': '#19211c',
    card: '#171e19',
    ink: '#e2e8de',
    'ink-soft': '#c2cbc0',
    muted: '#8e998f',
    line: '#2f3a33',
    'line-2': '#27312b',
    glass: 'rgba(18,24,20,.86)',
    deep: '#0b100d',
    'on-deep': '#e2e8de',
    'on-deep-muted': '#97a298',
    'deep-line': '#26302a',
  },
};

export const THEME_STORAGE_KEY = 'usa-theme';
export const ENQUIRY_STORAGE_KEY = 'usa-enquiry';

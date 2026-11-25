import { renderToString } from 'react-dom/server';
import { StrictMode } from 'react';
import App from './App';
import { getAllModules, getModuleById } from '../sandbox/core/registry';

export function render(url: string) {
  const html = renderToString(
    <StrictMode>
      <App initialUrl={url} />
    </StrictMode>,
  );
  return { html };
}

export { getAllModules, getModuleById };

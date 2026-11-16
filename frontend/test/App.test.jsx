import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { App } from '../src/App.jsx';
afterEach(() => { cleanup(); vi.restoreAllMocks(); });
describe('App', () => {
  it('renders API response', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ok:true,json:()=>Promise.resolve({message:'Hello from test'})})));
    render(<App />);
    expect(await screen.findByText('Hello from test')).toBeInTheDocument();
  });
});

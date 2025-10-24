#!/usr/bin/env node
// Connects to a running Playwright MCP server over SSE, performs a Google search for 'codex',
// takes a screenshot, saves to ./playwright-google-codex.png, and prints the path and page title.

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import fs from 'node:fs';
import path from 'node:path';

const PORT = process.env.PLAYWRIGHT_MCP_PORT ? Number(process.env.PLAYWRIGHT_MCP_PORT) : 4021;
const OUTPUT_PATH = path.resolve('./playwright-google-codex.png');

async function startServerIfNeeded() {
  // Always start a dedicated server on our port.
  const logFile = fs.openSync('.playwright-mcp.server.log', 'a');
  const proc = spawn('npx', [
    '-y', '@playwright/mcp', '--port', String(PORT), '--headless', '--output-dir', '.'
  ], { stdio: ['ignore', logFile, logFile] });

  // wait for port to be reachable
  const maxWaitMs = 15000;
  const start = Date.now();
  while (Date.now() - start < maxWaitMs) {
    await delay(300);
    try {
      const log = fs.readFileSync('.playwright-mcp.server.log', 'utf8');
      if (log.includes(`Listening on http://localhost:${PORT}`)) return proc;
    } catch {}
  }
  throw new Error('Failed to start Playwright MCP server');
}

async function main() {
  const proc = await startServerIfNeeded();
  const transport = new SSEClientTransport(new URL(`http://localhost:${PORT}/sse`));
  const client = new Client({ name: 'aierxuan-script', version: '1.0.0' });
  await client.connect(transport);

  const call = (name, args) => client.callTool({ name, arguments: args ?? {} });

  // 1) 打开 https://www.google.com
  await call('browser_navigate', { url: 'https://www.google.com' });

  // 取页面快照，找到搜索框 ref
  const snap = await call('browser_snapshot', {});
  const snapText = snap.content?.map(p => p.text).join('\n') || '';
  const m = (/\bcombobox\b[^\n]*\[ref=(e\d+)\]/i.exec(snapText))
         || (/\btextbox\b[^\n]*\[ref=(e\d+)\]/i.exec(snapText))
         || (/\bsearchbox\b[^\n]*\[ref=(e\d+)\]/i.exec(snapText));
  let ref = null;
  if (m) ref = m[1];
  if (!ref) {
    throw new Error('未能在快照中定位搜索框 combobox');
  }

  // 2) 在搜索框输入 'codex' 并提交
  await call('browser_type', { element: 'Search box', ref, text: 'codex', slowly: false, submit: true });

  // 适当等待搜索结果加载
  await call('browser_wait_for', { time: 1.2 });

  // 3) 截图保存到 ./playwright-google-codex.png
  await call('browser_take_screenshot', { filename: path.basename(OUTPUT_PATH), fullPage: false });

  // 4) 获取页面标题
  const evalRes = await call('browser_evaluate', { function: '() => document.title' });
  const titleBlock = evalRes.content?.[0]?.text || '';
  const titleMatch = /### Result\n\"([^\"]*)\"/.exec(titleBlock);
  const title = titleMatch ? titleMatch[1] : 'Untitled';

  await client.close();
  if (proc) {
    // leave server running is fine, but we can terminate background server
    try { proc.kill(); } catch {}
  }

  console.log(JSON.stringify({ screenshot: OUTPUT_PATH, title }, null, 2));
}

main().catch(err => {
  console.error('[playwright-mcp-google] Failed:', err?.stack || err);
  process.exit(1);
});

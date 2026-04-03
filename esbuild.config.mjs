/**
 * Bundles the sample plugin TypeScript sources and compiles SCSS into host-loadable outputs.
 */

import { context, build } from 'esbuild';
import { watch as watchFileSystem } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import * as sass from 'sass-embedded';

const projectRoot = process.cwd();
const entryPoint = path.join(projectRoot, 'src', 'main.ts');
const styleEntry = path.join(projectRoot, 'src', 'styles.scss');
const outputFile = path.join(projectRoot, 'main.js');
const styleOutputFile = path.join(projectRoot, 'styles.css');
const watchMode = process.argv.includes('--watch');

function createEsbuildOptions() {
  return {
    entryPoints: [entryPoint],
    bundle: true,
    format: 'cjs',
    jsx: 'automatic',
    platform: 'node',
    target: ['node20'],
    outfile: outputFile,
    external: ['wstudio-api'],
    sourcemap: true,
    logLevel: 'info',
  };
}

async function buildStyles() {
  const result = await sass.compileAsync(styleEntry, {
    style: 'expanded',
    sourceMap: true,
  });

  await writeFile(styleOutputFile, result.css, 'utf8');
  console.log('[wstudio-plugin-sample] styles.css built');
}

async function main() {
  await buildStyles();

  if (!watchMode) {
    await build(createEsbuildOptions());
    return;
  }

  const buildContext = await context(createEsbuildOptions());
  await buildContext.watch();

  const styleWatcher = watchFileSystem(path.dirname(styleEntry), (_eventType, fileName) => {
    if (typeof fileName !== 'string' || !fileName.endsWith('.scss')) {
      return;
    }

    void buildStyles().catch((error) => {
      console.error(error instanceof Error ? error.message : String(error));
    });
  });

  console.log('[wstudio-plugin-sample] watching TypeScript and SCSS sources');

  for (const signal of ['SIGINT', 'SIGTERM']) {
    process.on(signal, () => {
      styleWatcher.close();
      void buildContext.dispose().finally(() => {
        process.exit(0);
      });
    });
  }

  await new Promise(() => undefined);
}

void main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});

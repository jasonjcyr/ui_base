import { readFileSync } from 'fs';
import { resolve } from 'path';
import { pathsToModuleNameMapper } from 'ts-jest';

const tsconfig = JSON.parse(readFileSync(resolve('./tsconfig.json'), 'utf8')).compilerOptions;

export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.mjs'],
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: './tsconfig.json',
      isolatedModules: true,
      diagnostics: false,
    },
  },
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/index.{ts,tsx}',
    '!src/**/*.stories.{ts,tsx}',
    '!src/**/vite-env.d.ts',
  ],
  transform: {},
  moduleNameMapper: {
    ...pathsToModuleNameMapper(tsconfig.paths, { prefix: '<rootDir>/' }),
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
  },
};

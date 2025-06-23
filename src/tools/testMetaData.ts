import { TestMetaData } from '@/interfaceCollection/TestMetaData.interface';

const TEST_META_KEYS: Array<keyof TestMetaData> = ['data-testid', 'data-uitest'];

export function appendTestMetaData(
  testMetaData?: TestMetaData,
  localString?: string,
  delimiter: string = '-',
): TestMetaData | undefined {
  if (!testMetaData) return undefined;
  if (!localString) return { ...testMetaData };

  const appendedMetaData: TestMetaData = {};

  for (const key of TEST_META_KEYS) {
    const baseValue = testMetaData[key];
    if (baseValue) {
      appendedMetaData[key] = `${baseValue}${delimiter}${localString}`;
    }
  }

  return appendedMetaData;
}

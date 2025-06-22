import { TestMetaData } from '@/interfaceCollection/TestMetaData.interface';

export const enableTestMetaData = (
  testMetaData?: TestMetaData,
  localString?: string,
): TestMetaData | undefined => {
  if (!testMetaData) return undefined;
  const appendedMetaData: TestMetaData = { ...testMetaData };
  if (testMetaData['data-testid']) {
    appendedMetaData['data-testid'] = `${testMetaData['data-testid']}${localString}`;
  }
  if (testMetaData['data-uitest']) {
    appendedMetaData['data-uitest'] = `${testMetaData['data-uitest']}${localString}`;
  }

  return appendedMetaData;
};

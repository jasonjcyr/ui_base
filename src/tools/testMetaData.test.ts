import { appendTestMetaData } from './testMetaData';
import { describe, expect, it } from '@jest/globals';

// adjust path if needed
import type { TestMetaData } from '@/interfaceCollection/TestMetaData.interface';

describe('appendTestMetaData', () => {
  it('returns undefined if no testMetaData is provided', () => {
    expect(appendTestMetaData(undefined, 'Suffix')).toBeUndefined();
  });

  it('returns original testMetaData if no localString is provided', () => {
    const input: TestMetaData = { 'data-testid': 'Button', 'data-uitest': 'Btn' };
    expect(appendTestMetaData(input)).toEqual(input);
  });

  it('appends localString to both keys when both exist', () => {
    const input: TestMetaData = { 'data-testid': 'Button', 'data-uitest': 'Btn' };
    const result = appendTestMetaData(input, 'Icon');
    expect(result).toEqual({
      'data-testid': 'Button-Icon',
      'data-uitest': 'Btn-Icon',
    });
  });

  it('appends localString only to existing keys', () => {
    const input: TestMetaData = { 'data-testid': 'Button' };
    const result = appendTestMetaData(input, 'Icon');
    expect(result).toEqual({
      'data-testid': 'Button-Icon',
    });
  });

  it('uses custom delimiter if provided', () => {
    const input: TestMetaData = { 'data-testid': 'Button', 'data-uitest': 'Btn' };
    const result = appendTestMetaData(input, 'Icon', '_');
    expect(result).toEqual({
      'data-testid': 'Button_Icon',
      'data-uitest': 'Btn_Icon',
    });
  });
});

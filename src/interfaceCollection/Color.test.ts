import { ValidTextColor, colorGroups, createValidTextColors, validTextColors } from './Color.type';

describe('colorGroups', () => {
  it('contains expected number of groups and steps', () => {
    expect(Object.keys(colorGroups)).toHaveLength(21);
    expect(colorGroups.base).toContain('00');
    expect(colorGroups.blue).toContain('900');
  });
});

describe('createValidTextColors', () => {
  it('generates the correct combined values', () => {
    const result = createValidTextColors(colorGroups);
    expect(result).toContain('base-00');
    expect(result).toContain('gray-500');
    expect(result).toContain('sky-blue-100');
    expect(result).toHaveLength(11 + 20 * 10); // base has 11, others 10
  });
});

describe('validTextColors', () => {
  it('matches expected string pattern', () => {
    validTextColors.forEach((color) => {
      expect(color).toMatch(/^[a-z\-]+-\d{2,3}$/);
    });
  });

  it('does not include duplicates', () => {
    const set = new Set(validTextColors);
    expect(set.size).toBe(validTextColors.length);
  });

  it('includes all expected shades for base', () => {
    const baseShades = validTextColors.filter((c) => c.startsWith('base-'));
    expect(baseShades).toHaveLength(11);
    expect(baseShades).toContain('base-00');
  });

  it('includes expected number of total values', () => {
    expect(validTextColors).toHaveLength(211); // 11 + 20×10
  });

  it('type ValidTextColor is assignable', () => {
    const sample: ValidTextColor = 'red-500'; // ensure type check works
    expect(sample).toBe('red-500');
  });
});

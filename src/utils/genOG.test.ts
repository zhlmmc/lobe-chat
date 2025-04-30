import { describe, expect, it } from 'vitest';

import { formatDescLength, formatTitleLength } from './genOG';

describe('formatTitleLength', () => {
  it('should return original title if length <= 60', () => {
    const title = 'Short Title';
    expect(formatTitleLength(title)).toBe(title);
  });

  it('should truncate title if length > 60', () => {
    const longTitle =
      'This is a very long title that should be truncated because it exceeds 60 characters';
    expect(formatTitleLength(longTitle)).toBe(
      'This is a very long title that should be truncated becaus...',
    );
  });

  it('should handle addOnLength parameter', () => {
    const title = 'This is a title that needs to be truncated with additional length parameter';
    expect(formatTitleLength(title, 10)).toBe('This is a title that needs to be truncated with...');
  });
});

describe('formatDescLength', () => {
  it('should return undefined if desc is empty', () => {
    expect(formatDescLength('')).toBeUndefined();
  });

  it('should return original desc if length <= 160', () => {
    const desc = 'Short description';
    expect(formatDescLength(desc)).toBe(desc);
  });

  it('should truncate desc if length > 160', () => {
    const longDesc =
      'This is a very long description that needs to be truncated because it exceeds the maximum length of 160 characters. We need to make sure it gets properly truncated with ellipsis at the end.';
    expect(formatDescLength(longDesc)).toBe(
      'This is a very long description that needs to be truncated because it exceeds the maximum length of 160 characters. We need to make sure it gets properly tru...',
    );
  });

  it('should append tags if provided and total length <= 160', () => {
    const desc = 'Description with tags';
    const tags = ['tag1', 'tag2', 'tag3'];
    expect(formatDescLength(desc, tags)).toBe('Description with tagstag1, tag2, tag3');
  });

  it('should truncate tags if total length > 160', () => {
    const desc = 'Description with very long tags';
    const tags = ['verylongtag1', 'verylongtag2', 'verylongtag3', 'verylongtag4', 'verylongtag5'];
    expect(formatDescLength(desc, tags)).toBe(
      'Description with very long tagsverylongtag1, verylongtag2, verylongtag3, verylongtag4, verylongtag5',
    );
  });

  it('should handle empty tags array', () => {
    const desc = 'Description with empty tags';
    expect(formatDescLength(desc, [])).toBe('Description with empty tags');
  });

  it('should handle undefined tags', () => {
    const desc = 'Description with no tags';
    expect(formatDescLength(desc)).toBe(desc);
  });

  it('should handle very long desc with short tags', () => {
    const longDesc = 'A'.repeat(155);
    const tags = ['tag1', 'tag2'];
    expect(formatDescLength(longDesc, tags)).toBe(longDesc + 'ta......');
  });

  it('should handle desc with exact length of 160', () => {
    const desc = 'A'.repeat(160);
    expect(formatDescLength(desc)).toBe(desc);
  });
});

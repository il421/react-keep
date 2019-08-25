import { filters, notes, text } from '../../../fixtures/unit.js';
import {  getFilteredNotes, getShortText } from '../../../../libs/filters';

test('should filter by search query', () => {

  const result = getFilteredNotes(notes, filters.search, []);
  expect(result).toEqual([notes[1]]);
});

test('should filter by a tag', () => {

  const result = getFilteredNotes(notes, '', filters.tagFilters);
  expect(result).toEqual([notes[1]]);
});

test('should cut and format text with ...', () => {

  const result = getShortText(text[0]);
  expect(result).toEqual(text[1]);
});


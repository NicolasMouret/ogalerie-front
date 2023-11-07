/* eslint-disable import/no-extraneous-dependencies */
import {
  describe, expect, expectTypeOf, it,
} from 'vitest';
import { setDateComment } from '../utils/dateMethods';

describe('setDateComment', () => {
  describe('Structure', () => {
    it('Should be a function', () => {
      expect(typeof setDateComment).toBe('function');
    });
    it('Should have 1 parameter', () => {
      expect(setDateComment.length).toBe(1);
    });
    it('First parameter should be a string', () => {
      expectTypeOf(setDateComment).parameter(0).toEqualTypeOf<string>();
    });
  });
  describe('Execution', () => {
    it('Should return a string', () => {
      expectTypeOf(setDateComment('2023-11-07 08:21:36.175627+07')).toEqualTypeOf<string>();
    });
    it('Should return a string with the format "day month year" in french', () => {
      expect(setDateComment('2023-11-07 08:21:36.175627+07')).toBe('7 novembre 2023');
    });
    it('Should throw an error if the string is not a valid date', () => {
      expect(() => setDateComment('invalid string')).toThrowError('Invalid date');
    });
  });
});

import { Country } from '@shared/constants/countries'
import { expect } from 'vitest'

import { ISO_3166_ALPHA_2_MAPPINGS } from '../../constants/iso'
import {
  filterCountries,
  getCountryByCallingCode,
  getCountryByIsoCode,
  getDefaultCountry
} from '../country'

export const COUNTRIES: readonly Country[] = [
  {
    name: ISO_3166_ALPHA_2_MAPPINGS.FR,
    isoCode: 'FR',
    callingCode: 33,
    format: '+.. ... .. .. ..',
    regions: ['europe', 'european-union']
  },
  {
    name: ISO_3166_ALPHA_2_MAPPINGS.BE,
    isoCode: 'BE',
    callingCode: 32,
    format: '+.. . .. .. .. ..',
    regions: ['europe', 'european-union']
  }
]

describe('helpers/country', () => {
  describe('getDefaultCountry', () => {
    it('should return an object', () => {
      expect(getDefaultCountry()).toBeTypeOf('object')
    })
    it('should be the France country by default', () => {
      expect(getDefaultCountry()).toEqual({
        name: 'France',
        isoCode: 'FR',
        callingCode: 33,
        format: '+.. ... .. .. ..',
        regions: ['europe', 'european-union']
      })
    })

    it('should be the correct country with an iso code', () => {
      expect(getDefaultCountry('BE')).toEqual({
        name: 'Belgium',
        isoCode: 'BE',
        callingCode: 32,
        format: '+.. . .. .. .. ..',
        regions: ['europe', 'european-union']
      })
    })
  })

  describe('getCountryByIsoCode', () => {
    it('should return an object', () => {
      expect(getCountryByIsoCode('FR')).toBeTypeOf('object')
    })
    it('should be the France country for iso FR', () => {
      expect(getCountryByIsoCode('FR')).toEqual({
        name: 'France',
        isoCode: 'FR',
        callingCode: 33,
        format: '+.. ... .. .. ..',
        regions: ['europe', 'european-union']
      })
    })
  })

  describe('getCountryByCallingCode', () => {
    it('should return an object for a valid calling code', () => {
      expect(getCountryByCallingCode(33)).toBeTypeOf('object')
    })
    it('should return null for an invalid calling code', () => {
      expect(getCountryByCallingCode(0)).toBeNull()
    })
  })

  describe('filterCountries', () => {
    it('should return an array', () => {
      expect(filterCountries(COUNTRIES, {})).toBeInstanceOf(Array)
    })
    it('should return the exact same array when no filters options', () => {
      expect(filterCountries(COUNTRIES, {})).toBe(COUNTRIES)
    })

    it('should return the exact same array when filters options are empty', () => {
      expect(
        filterCountries(COUNTRIES, {
          onlyCountries: [],
          excludeCountries: []
        })
      ).toBe(COUNTRIES)
    })

    it('should remove FR when exclude FR', () => {
      expect(
        filterCountries(COUNTRIES, {
          excludeCountries: ['FR']
        })
      ).toEqual([
        {
          name: ISO_3166_ALPHA_2_MAPPINGS.BE,
          isoCode: 'BE',
          callingCode: 32,
          format: '+.. . .. .. .. ..',
          regions: ['europe', 'european-union']
        }
      ])
    })
    it('should only contain FR when only FR', () => {
      expect(
        filterCountries(COUNTRIES, {
          onlyCountries: ['FR']
        })
      ).toEqual([
        {
          name: ISO_3166_ALPHA_2_MAPPINGS.FR,
          isoCode: 'FR',
          callingCode: 33,
          format: '+.. ... .. .. ..',
          regions: ['europe', 'european-union']
        }
      ])
    })

    it('should only contain BE when onlyCountries is BE and even exclude BE', () => {
      expect(
        filterCountries(COUNTRIES, {
          onlyCountries: ['BE'],
          excludeCountries: ['BE']
        })
      ).toEqual([
        {
          name: ISO_3166_ALPHA_2_MAPPINGS.BE,
          isoCode: 'BE',
          callingCode: 32,
          format: '+.. . .. .. .. ..',
          regions: ['europe', 'european-union']
        }
      ])
    })
  })
})
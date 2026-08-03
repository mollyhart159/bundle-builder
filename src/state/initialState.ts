import type { BundleState } from '../types/bundle'
import { lineKey, DEFAULT_VARIANT_ID } from '../utils/lineKey'

export const STORAGE_KEY = 'bundle-builder:v1'

export const initialState: BundleState = {
  quantities: {
    [lineKey('cam-v4', 'white')]: 1,
    [lineKey('cam-pan-v3', 'white')]: 2,
    [lineKey('sense-motion')]: 2,
    [lineKey('sense-hub')]: 1,
    [lineKey('microsd-256')]: 2,
  },
  activeVariant: {
    'cam-v4': 'white',
    'cam-pan-v3': 'white',
    'sense-motion': DEFAULT_VARIANT_ID,
    'sense-hub': DEFAULT_VARIANT_ID,
    'microsd-256': DEFAULT_VARIANT_ID,
  },
  selectedPlanId: 'plan-unlimited',
  openStep: 1,
}

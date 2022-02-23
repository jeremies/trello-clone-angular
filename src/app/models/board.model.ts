import { Prefs } from './prefs.model';

export interface Board {
  id: string;
  name: string;
  prefs: Prefs;
}

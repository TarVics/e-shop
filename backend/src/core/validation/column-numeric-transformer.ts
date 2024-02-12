import { ValueTransformer } from 'typeorm';
import { isNullOrUndefined } from '../utils';

export class ColumnNumericTransformer implements ValueTransformer {
  to(data?: number | null): number | null {
    if (!isNullOrUndefined(data)) {
      return data;
    }
    return null;
  }

  from(data?: string | null): number | null {
    if (!isNullOrUndefined(data)) {
      const res = parseFloat(data);
      if (isNaN(res)) {
        return null;
      } else {
        return res;
      }
    }
    return null;
  }
}

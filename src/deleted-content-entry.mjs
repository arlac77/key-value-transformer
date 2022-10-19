// @ts-check
import { EmptyContentEntry } from "./empty-content-entry.mjs";

/**
 * Represents a deleted entry.
 */
export class DeletedContentEntry extends EmptyContentEntry {

  /**
   * We are always deleted.
   *
   * @return {boolean} true
   */
  get isDeleted() {
    return true;
  }

  /**
   * Nothing there any more.
   * @return {boolean} false
   */
  get isExistent()
  {
    return false;
  }
}

import {I18nString} from "./I18n.type";
import {ApiKey, ApiRef} from "./Common.type";

export interface UriHeaderType {
    id: ApiKey;
    name: I18nString;
    category: ApiRef | null;
    items: UriHeaderType[];
    uri: string | null;
}

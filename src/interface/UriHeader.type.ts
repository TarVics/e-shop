import {I18nString} from "./I18n.type";

export interface UriHeaderType {
    id: string;
    name: I18nString;
    category: string | null;
    items: UriHeaderType[];
    uri: string | null;
}
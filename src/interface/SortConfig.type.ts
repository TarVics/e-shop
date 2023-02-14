import {SortDirectionEnum, SortKindEnum} from "../enum";
import {I18nString} from "./I18n.type";

export interface SortNameType {
    id: SortKindEnum;
    name: I18nString;
}

export interface SortDirectionType {
    id: SortDirectionEnum;
    name: I18nString;
}
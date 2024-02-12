import { SortOrderEnum, SortKindEnum } from "../enum";
import { I18nString } from "./I18n.type";

export interface SortNameType {
  id: SortKindEnum;
  name: I18nString;
}

export interface SortOrderType {
  id: SortOrderEnum;
  name: I18nString;
}
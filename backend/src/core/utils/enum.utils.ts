export function getEnumKeyByEnumValue<
  TEnumKey extends string,
  TEnumVal extends string | number,
>(
  enumObj: { [key in TEnumKey]: TEnumVal },
  enumValue: TEnumVal,
): TEnumKey | undefined {
  return (Object.keys(enumObj) as TEnumKey[]).find(
    (key: TEnumKey): boolean => enumObj[key] === enumValue,
  );
}

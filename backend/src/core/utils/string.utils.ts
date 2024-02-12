export function padString(length: number, str = ''): string {
  const res = str ? ' ' + str + ' ' : '';
  return length > res.length
    ? res.padStart((res.length + length) / 2, '=').padEnd(length, '=')
    : str;
}

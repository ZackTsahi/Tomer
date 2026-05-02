// Resolves a product image source to whatever expo-image expects.
// Local `require(...)` returns a number; remote URLs are strings.
export function imageSource(value: string | number) {
  return typeof value === 'number' ? value : { uri: value };
}

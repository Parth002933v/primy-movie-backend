type KeyValue = {
  [key: string]: string;
};

export function getFirstKeyValueUtils(obj: KeyValue): string {
  const keys = Object.keys(obj);
  if (keys.length > 0) {
    return obj[keys[0]];
  } else {
    return "The object is empty";
  }
}

export function getFirstKeyValuePairUtils2(obj: KeyValue): string {
  const keys = Object.values(obj);
  if (keys.length > 0) {
    return obj[keys[0]];
  } else {
    return "The object is empty";
  }
}

export function getFirstKeyValuePairUtils(
  obj: KeyValue
): { key: string; value: string } | null {
  const keys = Object.keys(obj);
  if (keys.length > 0) {
    const key = keys[0];
    const value = obj[key];
    return { key, value };
  } else {
    return null;
  }
}

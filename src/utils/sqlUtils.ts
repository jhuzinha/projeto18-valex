type Update = {
  object: object,
  offset: number
}

export function mapObjectToUpdateQuery({ object, offset = 1 }: Update) {
  const objectColumns = Object.keys(object)
    .map((key, index) => `"${key}"=$${index + offset}`)
    .join(",");
  const objectValues = Object.values(object);

  return { objectColumns, objectValues };
}
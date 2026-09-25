const externalAssetPattern = /^(?:[a-z]+:)?\/\//i;

export function getAssetUrl(source: string) {
  if (externalAssetPattern.test(source) || source.startsWith('data:') || source.startsWith('blob:')) {
    return source;
  }

  return `${import.meta.env.BASE_URL}${source.replace(/^\/+/, '')}`;
}

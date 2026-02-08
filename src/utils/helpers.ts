type ObjWithLanguage = { language: string | null }

export const filterByLanguage = <T extends ObjWithLanguage>(
  data: T[],
  lang?: string
): T[] => {
  return lang
    ? data.filter(item => item.language === lang)
    : data
}

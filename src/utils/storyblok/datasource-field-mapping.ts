const ANY_IN_ARRAY = (values) => {
  return {
    any_in_array: values.join(','),
  }
}

const IN = (values) => {
  return {
    in: values.join(','),
  }
}

export const datasourceFieldMapping = {
  'staircase-type': { field: 'staircaseTypes', query: ANY_IN_ARRAY },
  'staircase-style': { field: 'staircaseStyles', query: ANY_IN_ARRAY },
  'staircase-shape': { field: 'staircaseShapes', query: ANY_IN_ARRAY },
  'handrail-material': { field: 'handrailMaterials', query: ANY_IN_ARRAY },
  'color': { field: 'staircaseColors', query: ANY_IN_ARRAY },
  'railing-material': { field: 'railingMaterials', query: ANY_IN_ARRAY },
  'stair-tread-material': { field: 'stairTreadMaterials', query: ANY_IN_ARRAY },
  'railing': { field: 'railings', query: ANY_IN_ARRAY },
  'staircase-material': { field: 'staircaseMaterials', query: ANY_IN_ARRAY },
  'floors': { field: 'floors', query: IN },
  'outdoor': { field: 'outdoor', query: IN },
  'news-tags': { field: 'newsTags', query: ANY_IN_ARRAY },
}
export const fieldDatasourceMapping = Object.entries(
  datasourceFieldMapping,
).reduce((acc, [key, value]) => {
  acc[value.field] = {
    ...value,
    datasource: key,
  }
  return acc
}, {})

export const getDatasourceByField = (field) => {
  const filter = fieldDatasourceMapping[field]
  if (!filter) return

  return filter.datasource
}

export const getFieldsForDatasources = (datasources) => {
  const fields: string[] = []
  for (const key of datasources) {
    const filter = datasourceFieldMapping[key]
    if (!filter) continue

    const { field } = filter
    fields.push(field)
  }

  return fields
}

export const buildFilterQueryFromDatasources = (datasources) => {
  let filterQuery = {}
  for (const key in datasources) {
    const filter = datasourceFieldMapping[key]
    const { field, query } = filter
    filterQuery[field] = query(datasources[key])
  }

  return filterQuery
}

export const buildFilterQueryFromParams = (filters) => {
  if (!filters || !filters.length) return

  const filterValues = filters.split('!')
  const datasources = filterValues.reduce((acc, filterValue) => {
    const [key, value] = filterValue.split('_')
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(value)
    return acc
  }, {})

  return buildFilterQueryFromDatasources(datasources)
}

export const buildFilterQueryFromFields = (fields) => {
  if (!fields || typeof fields !== 'object' || !Object.keys(fields).length)
    return

  let datasources = {}
  Object.keys(fields).forEach((key) => {
    if (!fields[key] || !fields[key].length) return

    const filter = fieldDatasourceMapping[key]
    if (!filter) return

    datasources[filter.datasource] = fields[key]
  })

  const filterQuery = buildFilterQueryFromDatasources(datasources)

  return filterQuery
}

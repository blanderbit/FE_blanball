export class Enum {
  list = []
  constructor(config) {
    this.list = Array.isArray(config) ? config : []
  }

  isExistValue(value) {
    return this.list.includes(value)
  }
}

export const transpileQueryToConfig = (config, query) => {
  config = typeof config === 'object' ? config : {}
  query = typeof query === 'object' ? query : {}

  return Object.keys(query).reduce((acc, cur) => {
    const isType = config[cur]

    if (isType) {
      if (isType.constructor.name === Enum.name) {
        acc[cur] = isType.isExistValue(query[cur]) && String(query[cur])
      } else {
        acc[cur] = isType(query[cur])
      }
    }
    return acc
  }, {})
}

export const transpileInterseptorQueryToConfig = (config, to) => {
  to.meta.transpilledQuery = transpileQueryToConfig(config, to.query)
  return to.meta.transpilledQuery
}

export function FilterParamsDecorator(config) {
  config = typeof config === 'object' ? config : {}
  return (target, key, descriptor) => {
    const func = descriptor.value
    descriptor.value = (options) => {
      options = typeof options === 'object' ? options : {}
      const optionsKeys = Object.keys(options)
      const filterParams = optionsKeys.reduce((acc, cur) => {
        const isType =
          config[cur]?.constructor?.name === Enum.name
            ? config[cur]?.isExistValue(options[cur])
            : options[cur]?.constructor === config[cur]


        if (isType) {
          acc[cur] = options[cur]
        }

        return acc
      }, {})
      return func(filterParams)
    }
  }
}

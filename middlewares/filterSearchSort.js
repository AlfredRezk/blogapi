const qs = require('qs')

module.exports = (req, res, next) => {
  // Filter:
  // URL? filter[key1]=value1&filter[key2]=value2
  const filter = qs.parse(req.query).filter || {}

  //  Search:
  // URL ? search[key1]=value1&search[key2]=value2
  const search = qs.parse(req.query).search || {}
  //   {title: {$regex:'value1', $options:'i'}}
  for (let key in search) {
    search[key] = { $regex: search[key], $options: 'i' }
  }

  //Sort:
  // URL?sort[key1]=asc&sort[key2]=desc
  // 1:Ascending A-Z, -1 :Descending Z-A  //Deprecated
  // asc: Ascending A-Z, desc:Descending Z-A
  const sort = qs.parse(req.query).sort || {}

  // Select=values
  const select = qs.parse(req.query).select || ''
  // convert from ',' to ' '
  const fields = select.split(',').join(' ')

  // Pagination
  // URL?page=3&limit=5

  let limit = Number(req.query?.limit)
  limit = limit > 0 ? limit : Number(process.env.PAGE_SIZE || 20)
  // Pages:
  let page = Number(req.query?.page)
  page = page > 0 ? page - 1 : 0

  // Skip
  let skip = Number(req.query?.skip)
  skip = skip > 0 ? skip : page * limit

  //   Adding getModelList() to res object
  res.getModelList = async (Model, populate = null) => {
    const query = Model.find({ ...filter, ...search })
    if (populate.length > 0) {
      populate.forEach((item) => {
        query.populate(item)
      })
    }

    return await query.sort(sort).limit(limit).skip(skip).select(fields)
  }

  res.getModelListDetails = async (Model) => {
    const data = await Model.find({ ...filter, ...search })

    let details = {
      filter,
      search,
      sort,
      limit,
      select,
      page,
      skip,
      pages: {
        previous: page > 0 ? page : false,
        current: page + 1,
        next: page + 2,
        total: Math.ceil(data.length / limit),
      },
      totalRecords: data.length,
    }

    details.pages.next =
      details.pages.next > details.pages.total ? false : details.pages.next
    if (details.totalRecords <= limit) details.pages = false
    return details
  }

  next()
}

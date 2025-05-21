**Filter** `GET /api/posts/?filter[status]=published`
**Search** `GET /api/posts/?search[title]=react`
**Sort** `GET /api/posts?sort[createdAt]=desc`
**Pagination** `GET /api/posts/?page=2&limit=10`

**Combined** `GET /api/posts/?filter[status]=published&sort[createdAt]=desc&page=2&limit=10`

<!-- Middleware -->

res.getModelList(<Model>, 'author category')
res.getModelListDetails(<Model>)

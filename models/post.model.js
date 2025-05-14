const { model, Schema } = require('mongoose')
const slugify = require('slugify')

const postSchema = new Schema(
  {
    //_id,
    // title:String,
    title: { type: String, required: true, trim: true, unique: true },
    content: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    // createdAt:{type: Date, default: Date.now},
    // updatedAt: {type: Date, default: Date.now}
  },
  { timestamps: true },
)

postSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true })
  next()
})

module.exports = model('post', postSchema)

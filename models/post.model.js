const { model, Schema } = require('mongoose')
const slugify = require('slugify')

const postSchema = new Schema(
  {
    //_id,
    // title:String,
    title: {
      type: String,
      required: [true, 'Post title is required'],
      trim: true,
      unique: true,
    },

    content: {
      type: String,
      required: [true, 'Post content is required'],
      trim: true,
    },
    slug: { type: String, unique: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },

    // author: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: [true, 'Author is required'],
    // },
    // createdAt:{type: Date, default: Date.now},
    // updatedAt: {type: Date, default: Date.now}
  },
  { timestamps: true },
)

postSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true })
  next()
})

module.exports = model('Post', postSchema)

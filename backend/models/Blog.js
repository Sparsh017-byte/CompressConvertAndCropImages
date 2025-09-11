// server/models/Blog.js
const mongoose = require('mongoose');
const slugify = require('slugify');

const SectionSchema = new mongoose.Schema({
  heading: String,
  body: String
});

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  excerpt: String,
  coverImage: String,
  sections: [SectionSchema],
  tags: [String],
  author: { type: String, default: 'Admin' }
}, { timestamps: true });

BlogSchema.pre('validate', async function (next) {
  if (!this.title) return next();
  if (!this.slug || this.isModified('title')) {
    const base = slugify(this.title, { lower: true, strict: true });
    let slug = base;
    let i = 0;
    while (await mongoose.models.Blog.findOne({ slug })) {
      i++;
      slug = `${base}-${i}`;
    }
    this.slug = slug;
  }
  next();
});

module.exports = mongoose.model('Blog', BlogSchema);

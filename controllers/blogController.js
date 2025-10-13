import Blog from "../models/blogModel.js";
import cloudinary from "../config/cloudinary.js";
import slugify from "slugify";

// ✅ Create new blog post
export const createBlog = async (req, res) => {
  try {
    const { title, content, tags, status, author } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    // Upload image to Cloudinary if provided
    let imageUrl = "";
    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "blogs",
      });
      imageUrl = upload.secure_url;
    }

    const blog = await Blog.create({
      title,
      slug: slugify(title, { lower: true }),
      content,
      image: imageUrl,
      tags: tags ? JSON.parse(tags) : [],
      status,
      author,
    });

    res.status(201).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create blog" });
  }
};

// ✅ Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

// ✅ Get single blog
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blog" });
  }
};

// ✅ Update blog
export const updateBlog = async (req, res) => {
  try {
    const { title, content, tags, status, author } = req.body;

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    let imageUrl = blog.image;
    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "blogs",
      });
      imageUrl = upload.secure_url;
    }

    blog.title = title || blog.title;
    blog.slug = slugify(blog.title, { lower: true });
    blog.content = content || blog.content;
    blog.image = imageUrl;
    blog.tags = tags ? JSON.parse(tags) : blog.tags;
    blog.status = status || blog.status;
    blog.author = author || blog.author;

    await blog.save();

    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Failed to update blog" });
  }
};

// ✅ Delete blog
export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete blog" });
  }
};

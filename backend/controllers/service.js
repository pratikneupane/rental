import Service from "../models/Service.js";
import { createError } from "../utils/Error.js";

// create post
export const createPost = async (req, res, next) => {
  const newPost = new Service(req.body);
  console.log(" newPost", req.body);

  try {
    const savedPost = await newPost.save();
    console.log("saved", savedPost);
    res.status(200).json(savedPost);
  } catch (error) {
    next(error);
  }
};

//update post
export const updatePost = async (req, res, next) => {
  try {
    const post = await Service.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Service.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (error) {
        next(error);
      }
    } else {
      next(createError(401, "You can update only your post"));
    }
  } catch (error) {
    next(error);
  }
};

//delete post
export const deletePost = async (req, res, next) => {
  try {
    const post = await Service.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await Service.findByIdAndDelete(req.params.id);
        res.status(200).json("post deleted");
      } catch (error) {
        next(error);
      }
    } else {
      next(createError(403, "You can delete only your post"));
    }
  } catch (error) {
    next(error);
  }
};

//get a post
export const getPost = async (req, res, next) => {
  try {
    const getPost = await Service.findById(req.params.id);
    res.status(200).json(getPost);
  } catch (error) {
    next(error);
  }
};

//get all post
export const getPosts = async (req, res, next) => {
  const username = req.query.user;
  const catName = req.query.cat;
  const cityName = req.query.city;
  const districtName = req.query.district;
  const streetName = req.query.street;
  const searchQuery = req.query.search;

  try {
    let getPosts;
    if (username) {
      getPosts = await Service.find({ username });
    } else if (catName) {
      getPosts = await Service.find({ category: catName });
    } else if (cityName) {
      getPosts = await Service.find({
        city: { $regex: cityName, $options: "i" },
      });
    } else if (districtName) {
      getPosts = await Service.find({ district: districtName });
    } else if (streetName) {
      getPosts = await Service.find({ street: streetName });
    } else if (searchQuery) {
      // Check if there's a search query
      // Use regex to perform a case-insensitive search on the "title" field
      getPosts = await Service.find({
        $or: [
          { username: { $regex: searchQuery, $options: "i" } },
          { category: { $regex: searchQuery, $options: "i" } },
          { city: { $regex: searchQuery, $options: "i" } },
          { district: { $regex: searchQuery, $options: "i" } },
          { street: { $regex: searchQuery, $options: "i" } },
        ],
      });
    } else {
      getPosts = await Service.find().sort({ timestamp: -1 });
    }
    res.status(200).json(getPosts);
  } catch (error) {
    next(error);
  }
};

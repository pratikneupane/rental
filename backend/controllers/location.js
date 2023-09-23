import Location from "../models/Location.js";

//create a new location
export const createLocation = async (req, res, next) => {
  const newLocation = new Location(req.body);
  try {
    await newLocation.save();
    res.status(200).json("new location created");
  } catch (error) {
    next(error);
  }
};

//get all locations
export const getLocation = async (req, res, next) => {
  try {
    const location = await Location.find();
    res.status(200).json(location);
  } catch (error) {
    next(error);
  }
};

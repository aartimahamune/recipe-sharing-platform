import User from '../models/user.model.js';
import {errorHandler} from '../utils/error.js'
import Recipe from '../models/recipe.model.js';

export const test = (req, res)=>{
    res.json({
        message : "Test API"
    });
}

export const deleteUser = async (req, res, next) =>{
    if(req.user.id !== req.params.id) return next(errorHandler(401, 'You can only delete your own account!'))
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted successfully!');
    } catch (error) {
        next(error)
    }
}

export const getUserRecipes = async (req, res, next) =>{
    if(req.user.id === req.params.id)
        {
            try {
                const recipes = await Recipe.find({userRef : req.params.id});
                res.status(200).json(recipes);
            } catch (error) {
                
            }
        }
        else{
            return next(errorHandler(401, 'You can only view your own recipes!'));
        }
}

export const getUser = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.userRef);
      if (!user) {
        return next(errorHandler(404, 'User not found'));
      }
      const { password, ...rest } = user._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };
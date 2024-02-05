const Categories = require('../../api/v1/categories/model')

// get all categories
const getAllCategories = async (req, res, next) => {

    const result = await Categories.find()

    return result;
}

const getDetailCategories = async (id) => {

    const result = await Categories.findOne({ _id: id })
    
    return result;
}

const createCategories = async (name) => { 
    const result = await Categories.create({ name })
    
    return result;
}

const updateCategories = async (id,name) => {
    const result = await Categories.findOneAndUpdate(
        { _id: id },
        { name },
        { new: true, runValidators: true })
    
    return result;
}

const deleteCategories = async (id) => {

    const result = await Categories.findOneAndDelete({ _id: id })
    
    return result;
}

module.exports = {
    getAllCategories,
    getDetailCategories,
    createCategories,
    updateCategories,
    deleteCategories
}
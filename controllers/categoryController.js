const { Task } = require('../models');
const Category = require('../models/category');
const AppError = require('../utils/AppError');
const CatchAsync = require('../utils/CatchAsync')

exports.postCategory = CatchAsync(async(req,res,next)=>{
    const {name,tasks} = req.body;
    const data = await Category.create({
        name
    })
    if(Array.isArray(tasks) && tasks.length>0){
      await data.addTasks(tasks);
    }
    if(data){
        res.status(200).json({
            message:'Category Inserted Successfully',
            data 
        })

    }
    else{
        return next(new AppError('Something went wrong'),400);
    }
})

exports.getCategoryById = CatchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { _embed } = req.query;

  let category;

  if (_embed === 'tasks') {
    category = await Category.findByPk(id, {
      include: [
        {
          model: Task,
          through: { attributes: [] }
        }
      ]
    });
  } else {
    category = await Category.findByPk(id);
  }

  if (!category) {
    return next(new AppError('No Category Found', 404));
  }

  res.status(200).json({
    success: true,
    data: category
  });
});


exports.getCategory = CatchAsync(async (req, res, next) => {
  const data = await Category.findAll();
  res.status(200).json({
    success:true,
    data
  });
  if(!data){
    return next(new AppError('No Category found',404))
  }
});

exports.updateCategory = CatchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const [updated] = await Category.update(
    {name },
    { where: { id } }
  );

  if (updated === 0 ) return next(new AppError('Category not found', 404));

  const updatedCategory = await Category.findByPk(id);
  res.status(200).json({
    success:true,
    updatedCategory
  });
});


exports.deleteCategory = CatchAsync(async (req, res, next) => {
  const { id } = req.params;
  const deleted = await Category.destroy({ where: { id } });

  if (!deleted) return next(new AppError('Cateogory not found', 404));

  res.status(200).json({ message: 'Category deleted successfully' });
});


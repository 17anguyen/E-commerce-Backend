const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/categories', (req, res) => {
  Category.findAll({
    include:[{model:Product}]
  }).then(categories=>{
    if(!categories){
      return res.json(404).json({message:'No category found with this id'});
    }
    res.status(200).json(categories);
    res.json(categories)
  }).catch(err=>{
    console.log(err)
    res.status(500).json(err)
  })
});

router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id,{
    include:[{model:Product}]
  }).then(category =>{
    if(!category){
      return res.json(404).json({message:'No category with this id',err});
    }
    res.status(200).json(category);
  }).catch(err =>{
  console.log(err);
  res.status(500).json(err);
})  
});
  // find all categories
  // be sure to include its associated Products
  router.post('/',  (req, res) => {
    Category.create({product_name:req.body.product_name})
    .then(newProduct =>{
      res.status(200).json(newProduct);
    }).catch(err =>{
      console.log(err);
      res.status(500).json(err);
    })
  });

  router.put('/:id', (req, res) => {
    Category.update(req.body,{
        where:{id:req.params.id}
      }).then(categories =>{
        if(!categories[0]){
          return res.status(404).json({message:"No category with this id!"})
        }
        res.status(200).json(categories);
      }).catch(err=>{
        console.log(err);
      res.status(500).json(err);
    })
  });
  
  router.delete('/:id', async (req, res) => {
    Category.destroy({
        where:{
          id:req.params.id, 
        }
      }).then(categories =>{
        if(!categories){
          return res.status(404).json({message:"No category with this id!"})
        }
        res.status(200).json(categories)
      }).catch(err=>{
        console.log(err);
      res.status(500).json(err);
    })
  });

module.exports = router;

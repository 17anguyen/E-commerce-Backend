const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all tags
router.get('/', (req, res) => {
  Tag.findAll({
    include:[{model: Product}]
  })
  .then(tags=>{
    if(tags.length === 0){
      res.status(404).json({message:"No tags in this database"});
    }
    res.status(200).json(tags)
  }).catch(err=>{
    console.log(err)
    res.status(500).json(err);
  })
});

  // find a single tag by its `id`
router.get('/:id', (req, res) => {
  Tag.findByPk(req.params.id,{
    include:[{model:Product}]
  })
  .then(tagData=>{
    if(!tagData){
      res.status(404).json({message:"No tags with that id in database"})
    }
    res.status(200).json(tagData)
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json(err)
  })
});

// create a new tag
router.post('/', (req, res) => {
  Tag.create(req.body)
  .then(tagData=>{
    res.status(200).json(tagData);
  })
  .catch(err =>{
    console.log(err)
    res.status(500).json(err);
  })
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(req.body,{
    where:{id:req.params.id}
  })
  .then(tagData =>{
    if(!tagData){
      return res.status(404).json({message:"No Tag with that id has been updated"})
    }
    res.status(200).json(tagData);
  })
  .catch(err=>{
  res.status(500).json(err);
})

});

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where:{
      id:req.params.id, 
    }
  })
  .then(tagData =>{
    if(!tagData){
      return res.status(404).json({message:'No tag with that id to delete'})
    }
    res.status(200).json(tagData)
  })
  .catch(err=>{
    console.log(err)
  res.status(500).json(err);
})
});

module.exports = router;

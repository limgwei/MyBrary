const express = require('express')
const router = express.Router()
const Author = require('../models/author')

//All authors Route
router.get('/', async (req,res)=>{

  try{
    const authors = await Author.find({name:new RegExp(req.query.name,"i")})
    res.render('authors/index',{
      authors:authors,
      searchOptions:req.query
    })
  }
  catch(err){
    res.redirect('/')
  }
 
})

//New Author route
router.get('/new',(req,res)=>{

  res.render('authors/new',{ author:new Author()})

})

//Create Author Routes
router.post('/',async (req,res)=>{
  const author = new Author({
    name: req.body.name
  })
  try {
    const newAuthor =await  author.save()
     // res.redirect("authors/${newAuthor.id}")
      return res.redirect('authors')
  } catch (error) {
    res.render('authors/new', {
      author:author,
      errorMessage: "Error creating Author"
    })
  }
  
})



module.exports = router
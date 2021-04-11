const express = require('express')
const router = express.Router()
const Author = require('../modles/author')


// All Author Route
router.get('/',async (req,res) => {
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index',{
            authors: authors,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

//New Author Route
router.get('/new',function(req, res) {
    res.render('authors/new', { author: new Author() })
})

// Create Author route
router.post('/',(req,res) =>{
    const author = new Author({
        name: req.body.name
    })

    try{
        const newAuthor = author.save()
         //res.redirect('authors/${newAuthor,id}')
        res.redirect('authors')
    } catch {
        res.render('authors/new',{
                author: author,
                errorMessage: 'Error creating Author'
            })
    }
    // author.save((err,newAuthor) =>{
    //    if(err) {
    //       
    //    } else{
    //     //    res.redirect('authors/${newAuthor,id}')
    //     res.redirect('authors')
    //    }
    // })
})




module.exports = router ;
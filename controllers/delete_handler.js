const BlogModel = require('../model/BlogModel')


module.exports.delete_post = async(req, res) =>{
    let _id = req.params._id

    try {
        await BlogModel.findByIdAndDelete(_id)
        res.redirect('/home')
    } catch (err) {
        console.log(err)
        res.send('Unable to delete the post')
    }
}


//     app.delete('/blogs/delete/:_id', (req, res)=>{
//         console.log('the dele')
        
       
//         let _id = req.params._id
//         BlogModel.findByIdAndDelete(_id)
    
//             .then(()=>{
               
//                 res.json({ redirect : '/blogs'})

//                 // BlogModel.find({}).sort({createdAt : -1})
//                 //     .then((posts)=>{
//                 //         res.render('homepage', {
//                 //             data : posts,
//                 //             user : user[0].username,
//                 //             heading : null
//                 //         })
//                 //         console.log('rendering homepage')
//                 //     })
//                 //     .catch(()=>{
//                 //         console.log('An error occoured in deletion')
//                 //     })
//                 // console.log(`post ${_id} has been deleted`)
                
//             })
//             .catch(()=>{
//                 console.log('An error occoured while deleting')
//             })
            
//     })

// }

// module.exports = deleteHandler
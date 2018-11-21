

    const fs = require('fs');
    const express = require('express')
    const app = express()
    const port = 3000 
    const bodyParser = require('body-parser')



    app.use('/public', express.static('public'));
    app.use(bodyParser.urlencoded({ extended: false }))
    app.set('view engine', 'ejs')

    app.get('/', function(req, res){
        fs.readFile('users.json', function ( error, data) {
            if (error ) { 
                throw error}

            var obj = JSON.parse(data);
            
        res.render('index', {user: obj})

    });
});

    // app.post('/userInfo', function (req, res){
    //     fs.readFile('users.json', function ( error, data) {
    //         if (error ) { throw error
    //         }
    //         var obj = JSON.parse(data);
        
    //     let userInput1 = req.body.firstname;
    //     let userInput2 = req.body.lastname;

    //     function userFinder(){
    //         for(i = 0; i < obj.length; i++){
    //             if (userInput1 == obj[i].firstname || userInput2 == obj[i].lastname)
    //             res.render('userInfo', {user: obj[i]})
    //      }
    //     }
    //          userFinder()
    // })




// app posts, with for loop for ajax 

    app.post('/userInfo', function (req, res){
        console.log(req.body)

        fs.readFile('users.json', function (error, data){
                if (error) { throw error}
                var obj = JSON.parse(data);
                const result = [];

               for (let i = 0; i < obj.length; i++) {

                   if (obj[i].firstname.indexOf(req.body.userInput) > -1
                       || obj[i].lastname.indexOf(req.body.userInput) > -1){
                       result.push(obj[i]);
                       console.log("Ressult", result);
                    
                   }
               }
               var response = {user: result}
                console.log("ress", result)
                res.send(response);
            })

        
    })


    // adds new user info to JSON file 

    app.post('/newuser', function (req, res){
        fs.readFile('users.json', function (error, data){
            if (error ) throw error
            let users = JSON.parse(data);
           
            console.log("beforepusg", users)
           
            users.push({
                firstname: req.body.newfirstname,
                lastname: req.body.newlastname,
                email: req.body.newemail,
            })

            console.log("after push",users);
            fs.writeFile('./users.json', JSON.stringify(users), 'utf-8', function(err) {
                if (err) throw err
                console.log('yessss welcome'); 
            
            })

        })

        res.redirect("/")
    
        });

        
    
         
    app.listen(port, () => console.log(`Example ${port}!`))
    



//     app.get('/:param1', function (req, res) {
//     console.log(req, params)
//     res.sender ('index', {cat: req.params.params1}


//<ul>${(userArray[i].firstname) + ' ' + (userArray[i].lastname)}</ul>`
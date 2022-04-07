const newRoute = function( Router, DB, Multipart ){

    Router.route('/user/collection/:userid').get( Multipart.none(), (req, res) => {
        
        const body = req.params;

         // Return now if we're missing key details
        if ( body.owner == 'null' ) {
            res.json( {
                message: 'User ID is missing.',
                status: false
            } );
            return;
        }

        // Check if this user exists first.
        const User = DB.schemas.User;
        User.find( {_id: body.userid}, (error, searchResult) => {

            // Stop if user exists already.
            if (!searchResult){
                res.json( {
                    message: 'User not found!',
                    status: false
                } );
                return;
            }

            //Mapping all the books of the user
            const books =  DB.schemas.Book;
            books.find({'userid': body.userid}, (err , allbooks) => {
                if(err)
	                console.log("Error : %s ",err);

                let result = allbooks.map(book => {
                    return {
                        title: book.title
                    }
                });
        
            //Mapping books into collection of the user
            const collection =  DB.schemas.Collection;
            collection.find({'owner': body.userid}, (err , collect) => {
                if(err)
	                console.log("Error : %s ",err);

                let results = collect.map( collect => {
                    return {
                        name: collect.name,
                        id: collect._id.toString(),
                        books: result
                        }
                    });

            res.json({
                userId: body.userid,
                collections: results
            });
        });
    }); }); 
    }).post(Multipart.none(), (req, res) => {
        
    });
}

export default newRoute;

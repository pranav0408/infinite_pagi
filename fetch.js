var container = document.querySelector('.container');
var bookCount = 0;
var bookCountTag = 0;
var loader = document.querySelector('.loader')
var loadFlag = true;
async function fetchData(){
    fetch( 'https://newprod.zypher.co/books/getbooksBytags',
        {
            method: 'POST',
            body: {
                "booksPerpage": 10, 
                "tags": "Business",
                "pageNumber": 0,
                "showAll": true
            },
        }
    )
    .then(response => {
        loader.style['opacity'] = 0;
        container.style['padding-top'] = '0px';
        return response.json() ;
    })
    .then( resData => {
        loader.style['display'] = 'none';
        var books = resData.books;

        for(var i=0; i < books.length; i=i+2){

            container.innerHTML += `

            <div class="row">
                <div class="col-sm-6">
                    <div class="card">
                        <img src="` + books[i].imageURL + `" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title"> ` + books[i].productName + ` </h5>
                            <p class="card-text author"> Author:  ` + books[i].authorName + ` </p>
                            <p class="card-text "> Tags: </p>
                            <p class="card-text badge`+(bookCount++)+`"> </p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card">
                        <img src=" ` + books[i+1].imageURL + ` " class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title"> ` + books[i+1].productName + ` </h5>
                            <p class="card-text author"> Author:  ` + books[i+1].authorName + ` </p>
                            <p class="card-text "> Tags: </p>
                            <p class="card-text badge`+(bookCount++)+`"> </p>
                        </div>
                    </div>
                </div>
            </div>
               `
            books[i].tags.forEach(e => {
                badge = '.'+'badge'+(bookCountTag);
                document.querySelector(badge).innerHTML += ` <span class="badge badge-primary" >`+e+`</span> `
            });
            bookCountTag++;
            books[i+1].tags.forEach(e => {
                badge = '.'+'badge'+(bookCountTag);
                document.querySelector(badge).innerHTML += ` <span class="badge badge-primary" >`+e+`</span> ` 
            });
            bookCountTag++;
       }
    })
}

fetchData()

$(window).scroll(function() {
    
    if($(window).scrollTop() ==  $(document).height()- $(window).height())
    {   
        if(loadFlag == true){
            loadFlag = false;
            fetchData()
        }
    }

    setTimeout( ()=>{
        loadFlag = true
    },1000
    )
});
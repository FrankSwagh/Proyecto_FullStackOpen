const dummy = (blogs) => {
    if (true) {
        return 1
    }
}

const totalLikes = (listWithOneBlog) => {
    const Nlikes = 0
    const counLikes = []
    listWithOneBlog.forEach(elem => {
        counLikes.push(elem.likes)
    })
    const sumlikes = counLikes.reduce((anterior, actual) => anterior + actual, Nlikes)
    return sumlikes
}

const favoriteBlog = (listWithBlogs) => {
    var arreglo = []
    var favBlog = [{
        likes: 0
    }]
    listWithBlogs.map(elem => {
        if( elem.likes >= favBlog[0].likes ){
            arreglo.length = 0
            arreglo.push(elem)
        }
        return arreglo
    })
    return arreglo
}

const mostBlogs = (listWithMoreBlogs) => {
    var lista = []
    listWithMoreBlogs
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}

let movies = [{
        title: "In Bruges",
        stars: 5,
        hasWatched: true
    },
    {
        title: "Frozen",
        stars: 4.5,
        hasWatched: false

    },
    {
        title: "Mad Max Fury Road",
        stars: 5,
        hasWatched: true
    },
    {
        title: "Les Miserables",
        stars: 3.5,
        hasWatched: false
    }
];

function movieDB() {
    movies.forEach(function (movie) {
        if (movie.hasWatched === true) {
            console.log('You have watched "' + movie.title + '" - ' + movie.stars + ' stars');
        } else {
            console.log('You have not seen "' + movie.title + '" - ' + movie.stars + ' stars');
        }
    });
}
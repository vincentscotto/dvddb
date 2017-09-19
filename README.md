
* express
* ejs
* body-parser
* mongodb
* mongoose

# http://collection-db-vincentscotto.c9users.io/

Each collection has: 

* name
* image

[
    {
        name: "DVD Title",
        image: "whatever.png",
        rating: "4/5",
        imdbLink: "http://imdb.com/whatever"
    }
]

# setup mongo

* mkdir data
* echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
* chmod a+x mongod
* ./mongod  (if doesn't work sudo apt-get install mongodb-org)

# mongo commands

* mongod
* mongo
* help
* show dbs
* use
* insert
* find
* update
* remove

# mongoose


# dvddb

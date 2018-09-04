$(function() {
    const vm = new Vue({
        el: '#app',
        data: {
            loading: false,
            filmId: 141052,
            apiKey: '8250fd614b41c7a2fafb23da36f630c1',
            film: null,
            credits: null
        },
        created(){
            this.loadFilm()
            this.loadCredits()
        },
        methods: {
            loadFilm(){
                this.loading = true


                this.$http.get(`https://api.themoviedb.org/3/movie/${this.filmId}`, {
                    params: {
                        api_key: this.apiKey
                    }
                })
                    .then(resp => {
                        this.film = resp.body
                        this.loading = false
                    })
            },
            loadCredits() {
                this.loading = true
                this.$http.get(`https://api.themoviedb.org/3/movie/${this.filmId}/credits`, {
                    params: {
                        api_key: this.apiKey
                    }
                })
                    .then(resp => {
                        this.credits = resp.body
                    })
            },

        },
        computed: {
            castRows(){
                if(!this.credits) return []
                return _.chunk(this.credits.cast, 4)
            }
        },
        filters: {
                img(path) {
                    return `https://image.tmdb.org/t/p/w500${path}`
                },
                
            }
    })
})
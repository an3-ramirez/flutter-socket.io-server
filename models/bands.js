const Band = require("./band");

class Bands {
    constructor() {
        this.bands = [];
    }

    addBand( band = new Band()) {
        this.bands.push(band);
    }

    getBands() {
        return this.bands;
    }

    deleteBands(id = '') {
        this.bands = this.bands.filter(band => band.id !== id);
        return this.bands;
    }

    voteBands(id = '') {
        this.bands = this.bands.map(band => {
            if (band.id === id ) {
                band.votes ++;
                return band;
            } else {
                return band;
            }
        })
    }

    resetVotesBands() {
        this.bands = this.bands.map(band => {
            band.votes = 0;
            return band;
        })
    }
}

module.exports = Bands;
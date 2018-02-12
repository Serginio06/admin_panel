import * as GoogleApi from "googlemaps";

const config = require("../../../../config/index");

const publicConfig = {
    key: config.googleApiKey,
    stagger_time: 1000,
    encode_polylines: false,
    secure: true,
};

export const getDistances = (origins, destinations, locationType) => {
    return new Promise((resolve) => {
        const reverseGeocodeParams = {
            latlng: origins,
            result_type: locationType,
        };

        const geocoder = new GoogleApi(publicConfig);

        geocoder.reverseGeocode(reverseGeocodeParams, (err, result) => {
            if (err) {
                return resolve(false);
            }

            if (!result.results || !result.results.length) {
                return resolve(false);
            }

            const shortName = result.results[0].address_components[0].short_name;

            reverseGeocodeParams.latlng = destinations;

            geocoder.reverseGeocode(reverseGeocodeParams, (err, res) => {
                if (err) {
                    return resolve(false);
                }

                if (!res.results || !res.results.length) {
                    return resolve(false);
                }

                return resolve(shortName === res.results[0].address_components[0].short_name);
            });
        });
    })
};

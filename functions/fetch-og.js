import ogs from 'open-graph-scraper';

const fetchURL = url => new Promise((resolve, reject) => {
    ogs({
        url,
        headers: {
            'User-Agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)',
        },
    }, (error, result) => {
        if (error) {
            reject(result);
        }

        resolve(result);
    });
});

export const handler = ({ queryStringParameters }) => fetchURL(queryStringParameters.url)
    .then(data => ({
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
        statusCode: 200,
    }))
    .catch(error => ({
        body: JSON.stringify(error),
        headers: {
            'Content-Type': 'application/json',
        },
        statusCode: 422,
    }));

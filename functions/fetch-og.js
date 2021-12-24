import og from 'open-graph';

const fetchURL = url => new Promise((resolve, reject) => {
    og(url, (error, meta) => {
        if (error) {
            reject(error);
        }

        resolve(meta);
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

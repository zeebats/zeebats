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
        statusCode: 200,
        body: JSON.stringify(data),
    }))
    .catch(error => ({
        statusCode: 422,
        body: JSON.stringify(error),
    }));

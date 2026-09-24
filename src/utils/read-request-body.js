export const readRequestBody = (request) => {
  return new Promise((resolve, reject) => {
    let body = '';

    request.on('data', (chunk) => {
      body += chunk;
    });

    request.on('end', () => {
      resolve(body);
    });

    request.on('error', (error) => {
      reject(error);
    });
  });
};

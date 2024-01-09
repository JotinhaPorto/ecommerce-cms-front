
export const to = (promise: Promise<any>) => (
    promise
        .then(data => ({ data, error: null }))
        .catch(error => ({ error, data: null }))
)
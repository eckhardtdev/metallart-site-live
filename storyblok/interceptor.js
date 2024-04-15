export const interceptor = (response) => {
        // one can handle status codes and more with the response
        if (response.status === 200) {
          // handle your status here
          console.log('response', response)
        }
        // ALWAYS return the response
        return response
      }
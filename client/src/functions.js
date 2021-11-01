import 'regenerator-runtime/runtime';

export async function post (action, data) {
   const msg = {
      timestamp: (new Date()).toISOString(),
      action: action,
      data
   }

   const response = await fetch(`http://${window.location.hostname}:2222`, {
      method: 'post',
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(msg)
   })
   .then((response) => response.json());

   console.log(response);

   return response;
}

window.post = post;

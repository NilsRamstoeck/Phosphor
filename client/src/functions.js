import 'regenerator-runtime/runtime';

const post = async function (action, data) {
   const msg = {
      timestamp: (new Date()).toISOString(),
      action: action,
      data
   }

   return await fetch(`http://${window.location.hostname}:2222`, {
      method: 'post',
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(msg)
   })
   .then((response) => response.json());
}

export {
   post
};

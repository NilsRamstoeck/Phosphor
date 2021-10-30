import 'regenerator-runtime/runtime';

const post = async function (data) {
   return await fetch(`http://${window.location.hostname}:8080`, {
      method: 'post',
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({
         data: data
      })
   })
   .then((response) => response.json());
}

export {
   post
};

export async function getIPAddress() {
   const result = await fetch('https://api.ipify.org?format=json');
   const response = await result.json();
   return response.ip;
}

export async function getGeographic() {
   const ip = await getIPAddress();
   const result = await fetch('http://ip-api.com/json/' + ip);
   const response = await result.json();
   return response;
}
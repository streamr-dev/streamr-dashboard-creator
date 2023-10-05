import StreamrClient from 'streamr-client';

let streamr: StreamrClient;

if (process.env.NODE_ENV === 'production') {
  streamr = new StreamrClient({
    auth: {
      privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY!,
    },
  });
} else {
  console.log('called');
  if (!global.streamr) {
    global.streamr = new StreamrClient({
      auth: {
        privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY!,
      },
    });
  }
  streamr = global.streamr;
}

export default streamr;

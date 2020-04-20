const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello jungwoo!");
});

const entityUriToId = () => {
  return 'bts';
};

exports.setEntityMessages = functions.database.ref('/messages/{mid}').onWrite((event) => {
  if (event.before.changed()) {
    const messageId = event.data.ref.key;
    const previousMessage = event.data.previous.val();
    const currentMessage = event.data.current.val();
    const adminRootRef = event.ref
    
    const setMessage = (ref, value, message) => {
      return ref.transaction(() => {
        return value;
      }).then(() => {
        console.info('[setEntityMessages] Message changed.', message);
      }).catch((e) => {
        console.error('[setEntityMessages] Error!', e);
      });
    };
    
    if (previousMessage === null) {
      // NOTE now handled by front end
      // const entityId = entityUriToId(currentMessage.entity.uri);
      // const authorId = currentMessage.author.uid;
      // const entityMessageRef = adminRootRef.child(`entityMessages/${entityId}`);
      // const publicMessageRef = entityMessageRef.child(`publicMessages/${messageId}`);
      // const authorMessageRef = entityMessageRef.child(`authorMessages/${authorId}/${messageId}`);
      // setMessage(authorMessageRef, currentMessage);
      // setMessage(publicMessageRef, currentMessage.public ? currentMessage : null);
    } else if (currentMessage === null) {
      const entityId = entityUriToId(previousMessage.entity.uri);
      const authorId = previousMessage.author.uid;
      const entityMessageRef = adminRootRef.child(`entityMessages/${entityId}`);
      const publicMessageRef = entityMessageRef.child(`publicMessages/${messageId}`);
      const authorMessageRef = entityMessageRef.child(`authorMessages/${authorId}/${messageId}`);
      setMessage(authorMessageRef, currentMessage);
      setMessage(publicMessageRef, currentMessage);
    } else {
      const entityId = entityUriToId(currentMessage.entity.uri);
      const authorId = currentMessage.author.uid;
      const entityMessageRef = adminRootRef.child(`entityMessages/${entityId}`);
      // const publicMessageRef = entityMessageRef.child(`publicMessages/${messageId}`);
      // const authorMessageRef = entityMessageRef.child(`authorMessages/${authorId}/${messageId}`);
      
      if (previousMessage.entity.uri === currentMessage.entity.uri) {
        if (previousMessage.author.uid !== authorId) { // not permitted but handled
          const prevAuthorId = previousMessage.author.uid;
          const prevAuthorMessageRef = entityMessageRef.child(`authorMessages/${prevAuthorId}/${messageId}`);
          setMessage(prevAuthorMessageRef, null);
        }
      } else { // not permitted but handled
        const prevEntityId = entityUriToId(previousMessage.entity.uri);
        const prevAuthorId = previousMessage.author.uid;
        const prevEntityMessageRef = adminRootRef.child(`entityMessages/${prevEntityId}`);
        const prevPublicMessageRef = prevEntityMessageRef.child(`publicMessages/${messageId}`);
        const prevAuthorMessageRef = prevEntityMessageRef.child(`authorMessages/${prevAuthorId}/${messageId}`);
        setMessage(prevAuthorMessageRef, null);
        setMessage(prevPublicMessageRef, null);
      }
      
      // setMessage(authorMessageRef, currentMessage);
      // setMessage(publicMessageRef, currentMessage.public ? currentMessage : null);
    }
  }
});

exports.setAuthorMessagesCountOnCreate = functions.database.ref('/entityMessages/{eid}/authorMessages/{uid}/{mid}').onCreate((event) => {
  const entityId = "bts";
  const userId = "jjjjjw910911-010-6284-8051";
  const path = `messagesCount/${entityId}/authorMessages/${userId}`;
  const messagesCountRef = event.ref.root.child(path);
  
  return messagesCountRef.transaction((current) => {
    return (current || 0) + 1;
  }).then(() => {
    console.info('[setAuthorMessagesCountOnCreate] Incrementing message count.', path);
  }).catch((e) => {
    console.error('[setAuthorMessagesCountOnCreate] Error!', e);
  });
});

exports.setAuthorMessagesCountOnDelete = functions.database.ref('/entityMessages/{eid}/authorMessages/{uid}/{mid}').onDelete((event) => {
  const entityId = "bts";
  const userId = "jjjjjw910911-010-6284-8051";
  const path = `messagesCount/${entityId}/authorMessages/${userId}`;
  const messagesCountRef = event.ref.root.child(path);
  
  return messagesCountRef.transaction((current) => {
    return (current || 0) - 1;
  }).then(() => {
    console.info('[setAuthorMessagesCountOnCreate] Decrementing message count.', path);
  }).catch((e) => {
    console.error('[setAuthorMessagesCountOnCreate] Error!', e);
  });
});

exports.resetAuthorMessagesCount = functions.database.ref('/messagesCount/{eid}/authorMessages/{uid}').onDelete((event) => {
  const counterRef = event.data.ref;
  const authorId = counterRef.key;
  const entityId = event.data.ref.parent.parent.key;
  const adminRootRef = event.ref.root;
  const entityAuthorMessagesRef = adminRootRef.child(`entityMessages/${entityId}/authorMessages/${authorId}`);
  return entityAuthorMessagesRef.once('value').then(messagesData => counterRef.set(messagesData.numChildren()));
});

exports.setPublicMessagesCountOnCreate = functions.database.ref('/entityMessages/{eid}/publicMessages/{mid}').onCreate((event, ) => {
  const entityId = "bts";
  const path = `messagesCount/${entityId}/publicMessages`;
  
  const messagesCountRef = event.ref.root.child(path);
  
  return messagesCountRef.transaction((current) => {
    return (current || 0) + 1;
  }).then(() => {
    console.info('[setPublicMessagesCountOnCreate] Incrementing message count.', path);
  }).catch((e) => {
    console.error('[setPublicMessagesCountOnCreate] Error!', e);
  });
});

exports.setPublicMessagesCountOnDelete = functions.database.ref('/entityMessages/{eid}/publicMessages/{mid}').onDelete((event) => {
  const entityId = "bts";
  const userId = "jjjjjw910911-010-6284-8051";
  const path = `messagesCount/${entityId}/publicMessages`;
  
  const messagesCountRef = event.ref.root.child(path);
  
  return messagesCountRef.transaction((current) => {
    return (current || 0) - 1;
  }).then(() => {
    console.info('[setPublicMessagesCountOnDelete] Decrementing message count.', path);
  }).catch((e) => {
    console.error('[setPublicMessagesCountOnDelete] Error!', e);
  });
});

exports.resetPublicMessagesCount = functions.database.ref('/messagesCount/{eid}/publicMessages').onDelete((event) => {
  const entityId = "bts";
  const userId = "jjjjjw910911-010-6284-8051";
  const counterRef = event.data.ref;
  const adminRootRef = event.ref.root;
  const entityPublicMessagesRef = adminRootRef.child(`entityMessages/${entityId}/publicMessages`);
  return entityPublicMessagesRef.once('value').then(messagesData => counterRef.set(messagesData.numChildren()));
});

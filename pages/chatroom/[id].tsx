import Filter from 'bad-words';
import firebase from 'firebase';
import { NextPage } from 'next';
import Link from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import ReactTooltip from 'react-tooltip';
import { Waypoint } from 'react-waypoint';
import { v4 } from 'uuid';
import { Button } from '../../components/Button';
import { SettingsModal } from '../../components/Modal';
import { Navbar } from '../../components/Navbar';
import { UploadedImage } from '../../components/UploadedImage';
import { emojis } from '../../utils/emojis';

const Chatroom: NextPage<{ id: string }> = ({ id }) => {
  const auth = firebase.auth();
  const storage = firebase.storage();
  const firestore = firebase.firestore();
  const [messages, setMessages] = useState([]);
  const [formValue, setFormValue] = useState('');
  const [showCover, setShowCover] = useState(true);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const closeEmojiButton = useRef<HTMLButtonElement>(null);
  const stake = useRef<HTMLDivElement>(null);

  const messagesRef = firestore.collection('messages');
  const chatRef = firestore.collection('chats').doc(id);

  const [chat]: any[] = useDocumentData(chatRef, { idField: 'id' });

  useEffect(() => {
    const filter = new Filter();
    filter.removeWords(...['wang', 'god', 'damn', 'poop']);
    const subscription = messagesRef
      .where('chatId', '==', id)
      .orderBy('createdAt')
      .limitToLast(25)
      .onSnapshot((querySnapshot) => {
        setMessages(
          querySnapshot.docs.map((doc) => {
            const data = doc.data();
            if (filter.isProfane(data.text)) {
              data.text = filter.clean(data.text);
            }
            data.id = doc.id;
            return data;
          }) as any
        );
        querySnapshot.docChanges().forEach((change) => {
          console.log(change.type);
          if (change.type === 'added') {
            if (change.doc.data().imageURL) {
              setTimeout(
                () => stake.current!.scrollIntoView({ behavior: 'smooth' }),
                750
              );
            } else {
              stake.current!.scrollIntoView({ behavior: 'smooth' });
            }
          }
        });
      });

    return () => {
      subscription();
    };
  }, []);

  const [user] = useAuthState(auth);

  const formatDate = (date: string) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en', options as any);
  };

  const sendMessage = async (
    value: string = formValue,
    isImage: boolean = false
  ) => {
    const { uid, photoURL } = user;
    const { serverTimestamp } = firebase.firestore.FieldValue;
    if (value === formValue) {
      setFormValue('');
    }

    // let valueToSend: any = value.split(' ');
    // if (!isImage) {
    //   valueToSend = valueToSend
    //     .map((word: string) => (word in emojis ? emojis[word] : word))
    //     .join(' ');
    // }

    if ((!isImage && value.trim()) || (isImage && value)) {
      await messagesRef.add({
        uid,
        photoURL,
        chatId: id,
        text: isImage ? null : value,
        imageURL: isImage ? value : null,
        createdAt: serverTimestamp(),
      });
    }
  };

  const isBanned = (uid: string = user?.uid) => chat?.banned?.includes(uid);
  const isModerator = () => chat?.moderators.includes(user.uid);
  const isMe = (message: any) => message.uid === user.uid;

  const uploadFromBlobAsync = async ({ blobUrl, name }: any) => {
    if (!blobUrl || !name) {
      return null;
    }

    try {
      const blob = await fetch(blobUrl).then((r) => r.blob());
      const snapshot = await storage.ref('images').child(name).put(blob);
      return await snapshot.ref.getDownloadURL();
    } catch (error) {
      throw error;
    }
  };

  const onDrop = useCallback(async ([file]) => {
    const name = v4();
    try {
      const url = await uploadFromBlobAsync({
        blobUrl: URL.createObjectURL(file),
        name: `${file.name}_${name}`,
      });
      sendMessage(url, true);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: 'image/*',
  });

  return (
    <div
      className="text-gray-50 bg-gray-800 min-h-screen"
      suppressHydrationWarning={true}
    >
      <div className="sticky top-0 w-full">
        <Navbar />
      </div>
      <div className="sticky z-50 top-0 py-6 px-5 bg-gray-900">
        <div className="relative flex items-center container mx-auto w-full justify-center">
          <Link href="/discuss">
            <a className="flex items-center text-gray-300 hover:text-gray-400 transition duration-300 mr-auto">
              <svg
                className="w-6 h-6 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <h1 className="text-lg font-medium">Leave Room</h1>
            </a>
          </Link>
          <div className="flex items-center absolute inset-x-auto">
            <h1 className="text-lg font-bold">{chat?.name}</h1>
          </div>
          <div>
            {isBanned() ? (
              <p className="text-red-600 font-bold">You have been banned</p>
            ) : isModerator() ? (
              <SettingsModal chat={chat} id={id} />
            ) : null}
          </div>
        </div>
      </div>
      <div className="pt-10 px-5">
        <div className="container mx-auto space-y-10 overflow-y-auto h-full pb-32 px-2">
          {messages?.map((message: any) => (
            <div
              className={`flex items-start ${
                isMe(message)
                  ? 'flex-row-reverse justify-start'
                  : 'justify-start'
              }`}
              key={message.id}
            >
              {message.photoURL ? (
                <img
                  src={message.photoURL}
                  alt="Profile Picture"
                  className={`w-10 h-10 object-cover rounded-full ${
                    isMe(message) ? 'ml-4' : 'mr-4'
                  }`}
                />
              ) : (
                <div
                  className={`w-10 h-10 rounded-full ${
                    isMe(message) ? 'ml-4 bg-lightBlue-600' : 'mr-4 bg-red-600'
                  }`}
                />
              )}
              <div
                data-for={`timestamp-${message.id}`}
                data-tip={formatDate(
                  message.createdAt?.toDate().toDateString()
                )}
              >
                {message.imageURL ? (
                  <UploadedImage message={message} />
                ) : (
                  <p
                    className={`px-5 max-w-md rounded-3xl ${
                      message.text.length > 58 ? 'py-3.5' : 'py-2'
                    } ${
                      isMe(message) ? 'bg-lightBlue-600' : 'bg-red-600'
                    } text-white`}
                  >
                    {message.text}
                  </p>
                )}
              </div>
              <ReactTooltip
                place="bottom"
                type="dark"
                effect="solid"
                id={`timestamp-${message.id}`}
                className="bg-gray-900 bg-opacity-90 text-white"
              />
              {!isMe(message) && isModerator() ? (
                <div className="mr-2 ml-4">
                  <button
                    className="mt-2 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full"
                    data-tip="Ban user"
                    data-for="ban-tooltip"
                    onClick={() => {
                      chatRef.update({
                        banned: firebase.firestore.FieldValue.arrayUnion(
                          message.uid
                        ),
                      });
                    }}
                  >
                    <svg
                      className="w-6 h-6 text-red-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <ReactTooltip
                    place="bottom"
                    type="dark"
                    effect="solid"
                    id="ban-tooltip"
                    className="bg-gray-900 bg-opacity-90 text-white"
                  />
                </div>
              ) : null}
              {!isMe(message) && isModerator() ? (
                <>
                  <button
                    className="mt-2 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                    data-tip="Delete message"
                    data-for="delete-tooltip"
                    onClick={async () => {
                      await messagesRef.doc(message.id).delete();
                    }}
                  >
                    <svg
                      className="w-6 h-6 text-red-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <ReactTooltip
                    place="bottom"
                    type="dark"
                    effect="solid"
                    id="delete-tooltip"
                  />
                </>
              ) : null}
            </div>
          ))}
          <div className="mb-20">
            <Waypoint
              onEnter={() => setShowCover(false)}
              onLeave={() => setShowCover(true)}
              scrollableAncestor="window"
            >
              <div ref={stake} />
            </Waypoint>
          </div>
        </div>
        <div
          className="fixed bottom-0 bg-gray-800 w-full"
          style={{ height: 'calc(7rem - 9px)' }}
        />
        <div className="fixed bottom-0 left-0 mb-8 ml-auto w-full">
          <div
            className={`${showCover ? 'block' : 'hidden'} h-36`}
            style={{
              position: 'relative',
              zIndex: -1,
              backgroundImage: 'linear-gradient(to top, #27272a, #27272a00)',
            }}
          />
          <div className="flex items-start max-w-4xl mx-auto px-5 space-x-4">
            <div className="relative flex flex-col-reverse items-center">
              <div className="absolute bottom-0 left-0 transform -translate-y-10">
                {emojiOpen ? (
                  <div className="relative rounded-lg bg-gray-700 shadow-2xl w-72 h-80 overflow-y-auto text-gray-200">
                    <div className="sticky top-0 flex items-center justify-between bg-gray-700 py-3 px-5 border-b border-gray-600">
                      <h3 className="font-bold text-lg text-gray-50">
                        Emoji Shortcuts
                      </h3>
                      <button
                        className="focus:outline-none focus:ring-2 focus:ring-red-600 rounded-sm p-0.5"
                        aria-label="Close"
                        ref={closeEmojiButton}
                        onClick={() => setEmojiOpen(false)}
                      >
                        <svg
                          className="w-4 h-4 text-gray-50"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    <ul className="pb-4 px-5 pt-2">
                      {Object.keys(emojis).map((key) => (
                        <li className="mb-1" key={v4()}>
                          <button
                            className="flex justify-between items-center text-xl w-full"
                            onClick={() => {
                              setEmojiOpen(false);
                              setFormValue(`${formValue}${emojis[key]} `);
                            }}
                          >
                            <span className="font-bold">{key}</span>
                            <span>{emojis[key]}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
              <button
                className="rounded focus:ring-2 focus:ring-red-600 focus:outline-none p-0.5 mb-1"
                onClick={() => {
                  if (!emojiOpen) {
                    closeEmojiButton.current?.focus();
                  }
                  setEmojiOpen(!emojiOpen);
                }}
                aria-label="Emojis"
              >
                <svg
                  className="w-6 h-6 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <button
                  className="rounded focus:ring-2 focus:ring-red-600 focus:outline-none p-0.5 mb-1.5"
                  aria-label="Upload Files"
                >
                  <svg
                    className="w-6 h-6 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 00-2 0v1H8a1 1 0 000 2h1v1a1 1 0 002 0v-1h1a1 1 0 000-2h-1V9z"
                      fillRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <form
              className="flex items-start space-x-3 w-full"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
            >
              <input
                value={formValue}
                onChange={({ target: { value } }) => {
                  setFormValue(value);
                  let newValue = value.split(' ');
                  newValue.forEach((word, index) => {
                    if (Object.keys(emojis).includes(word)) {
                      newValue[index] = `${emojis[word]} `;
                    }
                  });
                  setFormValue(newValue.join(' '));
                }}
                disabled={isBanned()}
                name="message"
                id="message"
                autoComplete="off"
                placeholder="Message"
                className={`w-full text-gray-200 bg-gray-700 px-5 pt-3 pb-8 rounded border border-gray-600 focus:outline-none focus:bg-gray-500 focus:bg-opacity-25 resize-none shadow-lg ${
                  isBanned() ? 'cursor-not-allowed' : ''
                }`}
              />
              <Button disabled={isBanned()} sans>
                <div className="flex items-center">
                  Send
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </div>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Chatroom.getInitialProps = async ({ query }) => {
  return { id: (query.id || '').toString() };
};

export default Chatroom;

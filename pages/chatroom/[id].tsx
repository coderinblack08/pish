import firebase from 'firebase';
import { NextPage } from 'next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button } from '../../components/Button';
import { Navbar } from '../../components/Navbar';

const Chatroom: NextPage<{ id: string }> = ({ id }) => {
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  const [formValue, setFormValue] = useState('');
  const [messages, setMessages] = useState([]);

  const messagesRef = firestore.collection('messages');
  const chatRef = firestore.collection('chats');

  useEffect(() => {
    const subscription = messagesRef
      .where('chatId', '==', id)
      .orderBy('createdAt')
      .limit(25)
      .onSnapshot((querySnapshot) => {
        setMessages(querySnapshot.docs.map((doc) => doc.data()) as any);
      });

    return () => {
      subscription();
    };
  }, []);

  const [user] = useAuthState(auth);

  const sendMessage = async () => {
    const { uid, photoURL } = user;
    const { serverTimestamp } = firebase.firestore.FieldValue;
    const valueToSend = formValue;
    setFormValue('');
    await messagesRef.add({
      uid,
      photoURL,
      chatId: id,
      text: valueToSend,
      createdAt: serverTimestamp(),
    });
  };

  return (
    <div className="text-gray-50 bg-gray-800 min-h-screen">
      <div className="sticky top-0 w-full">
        <Navbar />
      </div>
      <div className="sticky top-0 py-6 bg-gray-900 bg-opacity-50">
        <div className="container mx-auto">
          <Link href="/discuss">
            <a className="flex items-center">
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
              <h1 className="text-lg font-bold">Leave Room</h1>
            </a>
          </Link>
        </div>
      </div>
      <div className="pt-10 px-5">
        <div className="container mx-auto space-y-10 overflow-y-auto h-full pb-32 px-2">
          {messages?.map((message: any) => (
            <div
              className={`flex items-start ${
                message.uid === user.uid ? 'justify-end' : 'justify-start'
              } space-x-4`}
            >
              <img
                src={message.photoURL}
                alt="Profile Picture"
                className="w-10 h-10 object-cover rounded-full"
              />
              <p
                className={`px-4 py-1.5 rounded-full ${
                  message.uid === user.uid ? 'bg-lightBlue-600' : 'bg-red-600'
                } text-white`}
              >
                {message.text}
              </p>
              {message.uid === user.uid ? (
                <button className="mt-2">
                  <svg
                    className="w-5 h-5 text-red-600"
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
              ) : null}
            </div>
          ))}
        </div>
        <div
          className="fixed bottom-0 bg-gray-800 w-full"
          style={{ height: 'calc(7rem - 9px)' }}
        />
        <div className="fixed bottom-0 left-0 mb-8 ml-auto w-full">
          <form
            className="flex items-start space-x-3 container mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <input
              value={formValue}
              onChange={({ target: { value } }) => setFormValue(value)}
              name="message"
              id="message"
              placeholder="Message"
              className="w-full text-gray-200 bg-gray-700 px-5 pt-3 pb-8 rounded border border-gray-600 focus:outline-none focus:bg-gray-500 focus:bg-opacity-25 resize-none shadow-lg"
            />
            <Button sans>
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
  );
};

Chatroom.getInitialProps = async ({ query }) => {
  return { id: (query.id || '').toString() };
};

export default Chatroom;

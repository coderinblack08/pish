import firebase from 'firebase';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button } from '../components/Button';
import { Navbar } from '../components/Navbar';

const Create: React.FC = () => {
  const router = useRouter();
  const auth = firebase.auth();
  const firestore = firebase.firestore();

  const chatRef = firestore.collection('chats');
  const [user] = useAuthState(auth);

  return (
    <div className="min-h-screen bg-gray-800">
      <Navbar />
      <div className="py-32">
        <Formik
          initialValues={{ name: '', description: '' }}
          onSubmit={async (values) => {
            const payload = {
              ...values,
              moderators: [user.uid],
              official: false,
            };

            await chatRef.add(payload);
            router.push('/discuss');
          }}
        >
          {() => (
            <Form className="max-w-lg mx-auto">
              <Field name="name">
                {({ field, form: { isSubmitting } }: any) => (
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-gray-50 font-medium"
                    >
                      Name
                    </label>
                    <input
                      {...field}
                      disabled={isSubmitting}
                      id="name"
                      type="text"
                      className="bg-gray-700 bg-opacity-75 focus:bg-opacity-50 focus:outline-none py-1.5 px-3.5 rounded border border-gray-600 focus:border-gray-700 shadow text-gray-300 w-full text-lg"
                    />
                  </div>
                )}
              </Field>
              <Field name="description">
                {({ field, form: { isSubmitting } }: any) => (
                  <div className="mt-6">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-gray-50 font-medium"
                    >
                      Description
                    </label>
                    <textarea
                      {...field}
                      disabled={isSubmitting}
                      id="description"
                      type="text"
                      className="h-28 bg-gray-700 bg-opacity-75 focus:bg-opacity-50 focus:outline-none py-1.5 px-3.5 rounded border border-gray-600 focus:border-gray-700 shadow text-gray-300 w-full text-lg"
                    />
                  </div>
                )}
              </Field>
              <div className="mt-6 space-x-2">
                <Button type="submit" sans>
                  Submit
                </Button>
                <Button colorTheme="gray" href="/discuss" sans>
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Create;

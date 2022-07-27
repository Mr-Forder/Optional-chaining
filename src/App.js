import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
function App() {
  //let's create a person -
  const person = {
    name: "jimbob",
    age: 23,
  };
  //note that there's no 'job' value in this object. logging 'person.job' will result in an error

  //let's use axios to grab an array of objects from an api
  //first, create state for data - default needs to be null - an empty array would technically work but it's not accurately describing the data in it's current state. As it's null, not an empty array.

  const [data, setData] = useState(null);
  //then, in a useEffect, request the data and set it into state.
  useEffect(() => {
    axios
      .get("https://date.nager.at/api/v2/publicholidays/2022/gb")
      .then((response) => {
        setData(response.data);
      });
  }, []);

  return (
    <div className="App bg-gray-800">
      <h1 className="text-2xl font-semibold text-gray-800 uppercase dark:text-white lg:text-3xl">
        Optional Chaining and why it's great
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400 flex justify-center">
        Normally, trying to read a null value within an object will error out
        the app. With optional chaining, we can fix that. if you console log
        person.age without optional chaining, react will return a null value.
      </p>
      <p className="mt-2 text-gray-600 dark:text-gray-400 flex justify-center">
        However, if we instead use optional chaining, it'll return undefined
        instead.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div class="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl  m-auto w-full lg:w-1/2">
          <h1 class="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
            Without optional chaining:
          </h1>

          <h2 className="text-3xl font-semibold text-gray-700 capitalize dark:text-white">
            name: {person.name}
          </h2>
          <h2 className="text-3xl font-semibold text-gray-700 capitalize dark:text-white">
            age: {person.age}
          </h2>
          <h2 className="text-3xl font-semibold text-gray-700 capitalize dark:text-white">
            job: {person.job} (doesn't exist within person object - will return
            null)
          </h2>
        </div>
        <div class="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl  m-auto w-full lg:w-1/2">
          <h1 class="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
            With optional chaining:
          </h1>

          <h2 className="text-3xl font-semibold text-gray-700 capitalize dark:text-white">
            name: {person.name}
          </h2>
          <h2 className="text-3xl font-semibold text-gray-700 capitalize dark:text-white">
            age: {person.age}
          </h2>
          <h2 className="text-3xl font-semibold text-gray-700 capitalize dark:text-white">
            job: {person?.job} (doesn't exist within person object - will return
            undefined)
          </h2>
        </div>
      </div>

      <h1 className="text-2xl font-semibold text-gray-800 uppercase dark:text-white lg:text-3xl mt-32">
        When getting data from an api
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400 flex justify-center">
        Async functions can present an issue without optional chaining - before
        the async function finishes executing, the data will be returned as
        null. Without optional chaining, this would cause our app to error out.
        We can't just set it's initial state to an empty array, as this isn't
        accurate - we need to be able to tell react to also expect no data (if
        the api fails, for example)
      </p>
      <p className="mt-2 text-gray-600 dark:text-gray-400 flex justify-center">
        However, if we instead use optional chaining, it'll return undefined
        instead.
      </p>
      <div class="grid grid-cols-1  gap-6 mt-16">
        <div class="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl  m-auto w-full ">
          <h1 class="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
            Uk public holidays
          </h1>

          {data?.map((holiday) => {
            return (
              <h2 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
                {holiday.name}
              </h2>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

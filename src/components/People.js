import React, {useState} from "react";
import { usePaginatedQuery} from "react-query";
import Person from './Person';


const fetchPeople = async (key, page) => {
  const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  return res.json();
};

const People = () => {

  const [page, setPage] = useState(1)
  
  const {resolvedData, latestData, status} = usePaginatedQuery(["people", page], fetchPeople, {
    staleTime: 5000,
  });
 
  return (
    <div>
      <h2>People</h2>

      {status === 'loading'&& (
      <div>Loading...</div>
      )}

      {status === 'error' && (
        <div>Error loading</div>
      )}

      {status === 'success' && (
        <>
        <button onClick={() => setPage(old => Math.max(old - 1, 1))} disabled={page === 1}> Previous page </button>
        <span> {page} </span>
        <button onClick={() => setPage( old => (!latestData || !latestData.next ? old : old +1))} disabled={!latestData || !latestData.next}> Next page </button>
        <div>
          {resolvedData.results.map(person => <Person key={person.name} name={person.name} gender={person.gender} population={person.birth_year}/> )}
      </div>
      </>
      )}
      </div>
  );
};

export default People;

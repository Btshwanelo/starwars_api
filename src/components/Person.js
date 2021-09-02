const Person = ({ name, gender, birth_year}) => {
    return (
        <div className="card">
            <h3>{ name}</h3>
            <p>Gender - {gender}</p>
            <p>Birth year - { birth_year}</p>
        </div>
    );
}
 
export default Person;
const AgregarNombre = ({
  newName,
  newPhone,
  CambiarNombre,
  CambiarTelefono,
  ImprimirNombres
}) => {
  console.log(ImprimirNombres);
  return (
    <div>
      <form onSubmit={ImprimirNombres}>
        <div>
          name: <input value={newName} onChange={CambiarNombre} />
        </div>
        <div>
          number: <input value={newPhone} onChange={CambiarTelefono} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default AgregarNombre;

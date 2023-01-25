export default function TableHead() {
  return (
    <thead>
      <tr>
        {[
          'Name',
          'Rotation Period',
          'Orbital Period',
          'Diameter',
          'Climate',
          'Gravity',
          'Terrain',
          'Surface Water',
          'Population',
          'Films',
          'Created',
          'Edited',
          'URL',
        ].map((tableHead) => (
          <th key={ tableHead }>{tableHead}</th>
        ))}
      </tr>
    </thead>
  );
}

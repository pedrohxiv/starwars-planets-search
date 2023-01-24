import Table from './components/Table';
import TableProvider from './context/TableProvider';

export default function App() {
  return (
    <div>
      <TableProvider>
        <Table />
      </TableProvider>
    </div>
  );
}

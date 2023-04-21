import Cell from "./Cell";

const GameArea = () => {
  return (
    <table className="w-64 table-fixed text-5xl">
      <tbody>
        <tr className="border-b-2 border-gray-600">
          <td className="relative h-20 w-1/3 border-r-2 border-gray-600 text-center">
            <Cell x={0} y={0} />
          </td>
          <td className="relative h-20 w-1/3 border-r-2 border-gray-600 text-center">
            <Cell x={1} y={0} />
          </td>
          <td className="relative h-20 w-1/3 text-center">
            <Cell x={2} y={0} />
          </td>
        </tr>
        <tr className="border-b-2 border-gray-600">
          <td className="relative h-20 w-1/3 border-r-2 border-gray-600 text-center">
            <Cell x={0} y={1} />
          </td>
          <td className="relative h-20 w-1/3 border-r-2 border-gray-600 text-center">
            <Cell x={1} y={1} />
          </td>
          <td className="relative h-20 w-1/3 text-center">
            <Cell x={2} y={1} />
          </td>
        </tr>
        <tr className="border-b-8 border-gray-700">
          <td className="relative h-20 w-1/3 border-r-2 border-gray-600 text-center">
            <Cell x={0} y={2} />
          </td>
          <td className="relative h-20 w-1/3 border-r-2 border-gray-600 text-center">
            <Cell x={1} y={2} />
          </td>
          <td className="relative h-20 w-1/3 text-center">
            <Cell x={2} y={2} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default GameArea;

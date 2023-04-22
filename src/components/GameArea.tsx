import Cell from "./Cell";

const GameArea: React.FC<{ isViewMode?: boolean }> = ({
  isViewMode = false,
}) => {
  return (
    <table className="w-64 table-fixed text-5xl">
      <tbody>
        <tr className="border-b-2 border-gray-600">
          <td className="relative h-20 w-1/3 border-r-2 border-gray-600 text-center">
            <Cell x={0} y={0} isViewMode={isViewMode} />
          </td>
          <td className="relative h-20 w-1/3 border-r-2 border-gray-600 text-center">
            <Cell x={1} y={0} isViewMode={isViewMode} />
          </td>
          <td className="relative h-20 w-1/3 text-center">
            <Cell x={2} y={0} isViewMode={isViewMode} />
          </td>
        </tr>
        <tr className="border-b-2 border-gray-600">
          <td className="relative h-20 w-1/3 border-r-2 border-gray-600 text-center">
            <Cell x={0} y={1} isViewMode={isViewMode} />
          </td>
          <td className="relative h-20 w-1/3 border-r-2 border-gray-600 text-center">
            <Cell x={1} y={1} isViewMode={isViewMode} />
          </td>
          <td className="relative h-20 w-1/3 text-center">
            <Cell x={2} y={1} isViewMode={isViewMode} />
          </td>
        </tr>
        <tr className="border-b-8 border-gray-700">
          <td className="relative h-20 w-1/3 border-r-2 border-gray-600 text-center">
            <Cell x={0} y={2} isViewMode={isViewMode} />
          </td>
          <td className="relative h-20 w-1/3 border-r-2 border-gray-600 text-center">
            <Cell x={1} y={2} isViewMode={isViewMode} />
          </td>
          <td className="relative h-20 w-1/3 text-center">
            <Cell x={2} y={2} isViewMode={isViewMode} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default GameArea;

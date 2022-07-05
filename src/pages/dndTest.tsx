import { NextPage } from "next";
import { PropsWithChildren, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Knight = () => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.KNIGHT,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: "bold",
        cursor: "move",
      }}
    >
      ♘
    </div>
  );
};

const Square: React.FC<PropsWithChildren<{ black: boolean }>> = ({
  black,
  children,
}) => {
  const fill = black ? "black" : "white";
  const stroke = black ? "white" : "black";
  return (
    <div
      style={{
        color: stroke,
        width: "100%",
        height: "100%",
        backgroundColor: fill,
      }}
    >
      {children}
    </div>
  );
};

const BoardSquare: React.FC<
  PropsWithChildren<{
    x: number;
    y: number;
    moveKnight: (x: number, y: number) => void;
  }>
> = ({ x, y, children, moveKnight }) => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.KNIGHT,
      drop: () => moveKnight(x, y),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [x, y]
  );

  const black = (x + y) % 2 === 1;
  return (
    <div
      ref={drop}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Square black={black}>{children}</Square>
      {isOver && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: "yellow",
          }}
        />
      )}
    </div>
  );
};

const Board: React.FC<{
  knightPosition: number[];
  moveKnight: (x: number, y: number) => void;
}> = ({ moveKnight, knightPosition }) => {
  function renderSquare(i: number, knightPosition: number[]) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    return (
      <div key={i} style={{ width: "12.5%", height: "12.5%" }}>
        <BoardSquare x={x} y={y} moveKnight={moveKnight}>
          {renderPiece(x, y, knightPosition)}
        </BoardSquare>
      </div>
    );
  }

  function renderPiece(x: number, y: number, [knightX, knightY]: number[]) {
    if (x === knightX && y === knightY) {
      return <Knight />;
    }
  }

  const squares: JSX.Element[] = [];
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i, knightPosition));
  }

  return (
    <div
      style={{
        width: "50%",
        height: "50%",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {squares}
    </div>
  );
};

export const ItemTypes = {
  KNIGHT: "knight",
};

const TestPage: NextPage = () => {
  const [knightPosition, setKnightPosition] = useState<number[]>([0, 0]);
  const moveKnight = (x: number, y: number) => setKnightPosition([x, y]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Board knightPosition={knightPosition} moveKnight={moveKnight} />
    </DndProvider>
  );
};
export default TestPage;

import "./style.css";

export const ContentBoard = (props: { children: React.ReactNode }) => {
  return (
    <div className='feed'>
      <div className='content-board'>{props.children}</div>
    </div>
  );
};

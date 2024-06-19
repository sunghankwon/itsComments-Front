const ListRenderer = ({ list, renderItem, onItemClicked }) => {
  return (
    <>
      {list.map((item) => (
        <div
          key={item._id}
          onClick={() => onItemClicked && onItemClicked(item._id)}
        >
          {renderItem(item)}
        </div>
      ))}
    </>
  );
};

export default ListRenderer;
